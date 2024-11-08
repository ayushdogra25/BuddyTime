const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const families = sequelize.define(
    'families',
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

  families.associate = (db) => {
    db.families.belongsToMany(db.users, {
      as: 'members',
      foreignKey: {
        name: 'families_membersId',
      },
      constraints: false,
      through: 'familiesMembersUsers',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.families.belongsTo(db.family, {
      as: 'family',
      foreignKey: {
        name: 'familyId',
      },
      constraints: false,
    });

    db.families.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.families.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return families;
};
