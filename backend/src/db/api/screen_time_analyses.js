const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Screen_time_analysesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const screen_time_analyses = await db.screen_time_analyses.create(
      {
        id: data.id || undefined,

        usage_hours: data.usage_hours || null,
        recommendations: data.recommendations || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await screen_time_analyses.setUser(data.user || null, {
      transaction,
    });

    await screen_time_analyses.setFamily(data.family || null, {
      transaction,
    });

    return screen_time_analyses;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const screen_time_analysesData = data.map((item, index) => ({
      id: item.id || undefined,

      usage_hours: item.usage_hours || null,
      recommendations: item.recommendations || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const screen_time_analyses = await db.screen_time_analyses.bulkCreate(
      screen_time_analysesData,
      { transaction },
    );

    // For each item created, replace relation files

    return screen_time_analyses;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const screen_time_analyses = await db.screen_time_analyses.findByPk(
      id,
      {},
      { transaction },
    );

    await screen_time_analyses.update(
      {
        usage_hours: data.usage_hours || null,
        recommendations: data.recommendations || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await screen_time_analyses.setUser(data.user || null, {
      transaction,
    });

    await screen_time_analyses.setFamily(data.family || null, {
      transaction,
    });

    return screen_time_analyses;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const screen_time_analyses = await db.screen_time_analyses.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of screen_time_analyses) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of screen_time_analyses) {
        await record.destroy({ transaction });
      }
    });

    return screen_time_analyses;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const screen_time_analyses = await db.screen_time_analyses.findByPk(
      id,
      options,
    );

    await screen_time_analyses.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await screen_time_analyses.destroy({
      transaction,
    });

    return screen_time_analyses;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const screen_time_analyses = await db.screen_time_analyses.findOne(
      { where },
      { transaction },
    );

    if (!screen_time_analyses) {
      return screen_time_analyses;
    }

    const output = screen_time_analyses.get({ plain: true });

    output.user = await screen_time_analyses.getUser({
      transaction,
    });

    output.family = await screen_time_analyses.getFamily({
      transaction,
    });

    return output;
  }

  static async findAll(filter, globalAccess, options) {
    const limit = filter.limit || 0;
    let offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    const orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.users,
        as: 'user',
      },

      {
        model: db.family,
        as: 'family',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.recommendations) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'screen_time_analyses',
            'recommendations',
            filter.recommendations,
          ),
        };
      }

      if (filter.usage_hoursRange) {
        const [start, end] = filter.usage_hoursRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            usage_hours: {
              ...where.usage_hours,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            usage_hours: {
              ...where.usage_hours,
              [Op.lte]: end,
            },
          };
        }
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.user) {
        const listItems = filter.user.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          userId: { [Op.or]: listItems },
        };
      }

      if (filter.family) {
        const listItems = filter.family.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          familyId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.screen_time_analyses.count({
            where: globalAccess ? {} : where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.screen_time_analyses.findAndCountAll({
          where: globalAccess ? {} : where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit, globalAccess, organizationId) {
    let where = {};

    if (!globalAccess && organizationId) {
      where.organizationId = organizationId;
    }

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('screen_time_analyses', 'usage_hours', query),
        ],
      };
    }

    const records = await db.screen_time_analyses.findAll({
      attributes: ['id', 'usage_hours'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['usage_hours', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.usage_hours,
    }));
  }
};
