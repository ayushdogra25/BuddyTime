const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const family = sequelize.define(
    'family',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
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

  family.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.family.hasMany(db.users, {
      as: 'users_family',
      foreignKey: {
        name: 'familyId',
      },
      constraints: false,
    });

    db.family.hasMany(db.activities, {
      as: 'activities_family',
      foreignKey: {
        name: 'familyId',
      },
      constraints: false,
    });

    db.family.hasMany(db.chats, {
      as: 'chats_family',
      foreignKey: {
        name: 'familyId',
      },
      constraints: false,
    });

    db.family.hasMany(db.dashboards, {
      as: 'dashboards_family',
      foreignKey: {
        name: 'familyId',
      },
      constraints: false,
    });

    db.family.hasMany(db.families, {
      as: 'families_family',
      foreignKey: {
        name: 'familyId',
      },
      constraints: false,
    });

    db.family.hasMany(db.notifications, {
      as: 'notifications_family',
      foreignKey: {
        name: 'familyId',
      },
      constraints: false,
    });

    db.family.hasMany(db.screen_time_analyses, {
      as: 'screen_time_analyses_family',
      foreignKey: {
        name: 'familyId',
      },
      constraints: false,
    });

    //end loop

    db.family.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.family.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return family;
};
