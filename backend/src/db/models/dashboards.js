const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const dashboards = sequelize.define(
    'dashboards',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      schedule: {
        type: DataTypes.TEXT,
      },

      mood_check_in: {
        type: DataTypes.TEXT,
      },

      goal_tracker: {
        type: DataTypes.TEXT,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  dashboards.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.dashboards.belongsTo(db.users, {
      as: 'user',
      foreignKey: {
        name: 'userId',
      },
      constraints: false,
    });

    db.dashboards.belongsTo(db.family, {
      as: 'family',
      foreignKey: {
        name: 'familyId',
      },
      constraints: false,
    });

    db.dashboards.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.dashboards.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return dashboards;
};
