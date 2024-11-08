const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class DashboardsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const dashboards = await db.dashboards.create(
      {
        id: data.id || undefined,

        schedule: data.schedule || null,
        mood_check_in: data.mood_check_in || null,
        goal_tracker: data.goal_tracker || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await dashboards.setUser(data.user || null, {
      transaction,
    });

    await dashboards.setFamily(data.family || null, {
      transaction,
    });

    return dashboards;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const dashboardsData = data.map((item, index) => ({
      id: item.id || undefined,

      schedule: item.schedule || null,
      mood_check_in: item.mood_check_in || null,
      goal_tracker: item.goal_tracker || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const dashboards = await db.dashboards.bulkCreate(dashboardsData, {
      transaction,
    });

    // For each item created, replace relation files

    return dashboards;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const dashboards = await db.dashboards.findByPk(id, {}, { transaction });

    await dashboards.update(
      {
        schedule: data.schedule || null,
        mood_check_in: data.mood_check_in || null,
        goal_tracker: data.goal_tracker || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await dashboards.setUser(data.user || null, {
      transaction,
    });

    await dashboards.setFamily(data.family || null, {
      transaction,
    });

    return dashboards;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const dashboards = await db.dashboards.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of dashboards) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of dashboards) {
        await record.destroy({ transaction });
      }
    });

    return dashboards;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const dashboards = await db.dashboards.findByPk(id, options);

    await dashboards.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await dashboards.destroy({
      transaction,
    });

    return dashboards;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const dashboards = await db.dashboards.findOne({ where }, { transaction });

    if (!dashboards) {
      return dashboards;
    }

    const output = dashboards.get({ plain: true });

    output.user = await dashboards.getUser({
      transaction,
    });

    output.family = await dashboards.getFamily({
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

      if (filter.schedule) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('dashboards', 'schedule', filter.schedule),
        };
      }

      if (filter.mood_check_in) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'dashboards',
            'mood_check_in',
            filter.mood_check_in,
          ),
        };
      }

      if (filter.goal_tracker) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'dashboards',
            'goal_tracker',
            filter.goal_tracker,
          ),
        };
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
          count: await db.dashboards.count({
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
      : await db.dashboards.findAndCountAll({
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
          Utils.ilike('dashboards', 'schedule', query),
        ],
      };
    }

    const records = await db.dashboards.findAll({
      attributes: ['id', 'schedule'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['schedule', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.schedule,
    }));
  }
};
