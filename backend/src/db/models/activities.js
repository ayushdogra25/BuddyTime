const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const activities = sequelize.define(
    'activities',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      type: {
        type: DataTypes.ENUM,

        values: ['educational', 'offline', 'social'],
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

  activities.associate = (db) => {
    db.activities.belongsToMany(db.users, {
      as: 'suggestions',
      foreignKey: {
        name: 'activities_suggestionsId',
      },
      constraints: false,
      through: 'activitiesSuggestionsUsers',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.activities.belongsTo(db.family, {
      as: 'family',
      foreignKey: {
        name: 'familyId',
      },
      constraints: false,
    });

    db.activities.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.activities.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return activities;
};
