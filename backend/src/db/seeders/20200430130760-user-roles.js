const { v4: uuid } = require('uuid');

module.exports = {
  /**
   * @param{import("sequelize").QueryInterface} queryInterface
   * @return {Promise<void>}
   */
  async up(queryInterface) {
    const createdAt = new Date();
    const updatedAt = new Date();

    /** @type {Map<string, string>} */
    const idMap = new Map();

    /**
     * @param {string} key
     * @return {string}
     */
    function getId(key) {
      if (idMap.has(key)) {
        return idMap.get(key);
      }
      const id = uuid();
      idMap.set(key, id);
      return id;
    }

    await queryInterface.bulkInsert('roles', [
      {
        id: getId('SuperAdmin'),
        name: 'Super Administrator',
        createdAt,
        updatedAt,
      },

      {
        id: getId('Administrator'),
        name: 'Administrator',
        createdAt,
        updatedAt,
      },

      { id: getId('supervisor'), name: 'supervisor', createdAt, updatedAt },

      { id: getId('guardian'), name: 'guardian', createdAt, updatedAt },

      {
        id: getId('content_manager'),
        name: 'content_manager',
        createdAt,
        updatedAt,
      },

      { id: getId('family_admin'), name: 'family_admin', createdAt, updatedAt },

      {
        id: getId('support_specialist'),
        name: 'support_specialist',
        createdAt,
        updatedAt,
      },
    ]);

    /**
     * @param {string} name
     */
    function createPermissions(name) {
      return [
        {
          id: getId(`CREATE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `CREATE_${name.toUpperCase()}`,
        },
        {
          id: getId(`READ_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `READ_${name.toUpperCase()}`,
        },
        {
          id: getId(`UPDATE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `UPDATE_${name.toUpperCase()}`,
        },
        {
          id: getId(`DELETE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `DELETE_${name.toUpperCase()}`,
        },
      ];
    }

    const entities = [
      'users',
      'activities',
      'chats',
      'dashboards',
      'families',
      'notifications',
      'screen_time_analyses',
      'roles',
      'permissions',
      'family',
      ,
    ];
    await queryInterface.bulkInsert(
      'permissions',
      entities.flatMap(createPermissions),
    );
    await queryInterface.bulkInsert('permissions', [
      {
        id: getId(`READ_API_DOCS`),
        createdAt,
        updatedAt,
        name: `READ_API_DOCS`,
      },
    ]);
    await queryInterface.bulkInsert('permissions', [
      {
        id: getId(`CREATE_SEARCH`),
        createdAt,
        updatedAt,
        name: `CREATE_SEARCH`,
      },
    ]);

    await queryInterface.bulkUpdate(
      'roles',
      { globalAccess: true },
      { id: getId('SuperAdmin') },
    );

    await queryInterface.sequelize
      .query(`create table "rolesPermissionsPermissions"
(
"createdAt"           timestamp with time zone not null,
"updatedAt"           timestamp with time zone not null,
"roles_permissionsId" uuid                     not null,
"permissionId"        uuid                     not null,
primary key ("roles_permissionsId", "permissionId")
);`);

    await queryInterface.bulkInsert('rolesPermissionsPermissions', [
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('supervisor'),
        permissionId: getId('CREATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('supervisor'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('supervisor'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('supervisor'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('guardian'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('guardian'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('content_manager'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('family_admin'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('family_admin'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('support_specialist'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('supervisor'),
        permissionId: getId('CREATE_ACTIVITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('supervisor'),
        permissionId: getId('READ_ACTIVITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('supervisor'),
        permissionId: getId('UPDATE_ACTIVITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('supervisor'),
        permissionId: getId('DELETE_ACTIVITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('guardian'),
        permissionId: getId('READ_ACTIVITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('guardian'),
        permissionId: getId('UPDATE_ACTIVITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('content_manager'),
        permissionId: getId('CREATE_ACTIVITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('content_manager'),
        permissionId: getId('READ_ACTIVITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('content_manager'),
        permissionId: getId('UPDATE_ACTIVITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('content_manager'),
        permissionId: getId('DELETE_ACTIVITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('family_admin'),
        permissionId: getId('READ_ACTIVITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('family_admin'),
        permissionId: getId('UPDATE_ACTIVITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('support_specialist'),
        permissionId: getId('READ_ACTIVITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('supervisor'),
        permissionId: getId('CREATE_CHATS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('supervisor'),
        permissionId: getId('READ_CHATS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('supervisor'),
        permissionId: getId('UPDATE_CHATS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('supervisor'),
        permissionId: getId('DELETE_CHATS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('guardian'),
        permissionId: getId('READ_CHATS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('guardian'),
        permissionId: getId('UPDATE_CHATS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('content_manager'),
        permissionId: getId('READ_CHATS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('family_admin'),
        permissionId: getId('READ_CHATS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('family_admin'),
        permissionId: getId('UPDATE_CHATS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('support_specialist'),
        permissionId: getId('READ_CHATS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('supervisor'),
        permissionId: getId('CREATE_DASHBOARDS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('supervisor'),
        permissionId: getId('READ_DASHBOARDS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('supervisor'),
        permissionId: getId('UPDATE_DASHBOARDS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('supervisor'),
        permissionId: getId('DELETE_DASHBOARDS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('guardian'),
        permissionId: getId('READ_DASHBOARDS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('guardian'),
        permissionId: getId('UPDATE_DASHBOARDS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('content_manager'),
        permissionId: getId('READ_DASHBOARDS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('family_admin'),
        permissionId: getId('READ_DASHBOARDS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('family_admin'),
        permissionId: getId('UPDATE_DASHBOARDS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('support_specialist'),
        permissionId: getId('READ_DASHBOARDS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('supervisor'),
        permissionId: getId('CREATE_FAMILIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('supervisor'),
        permissionId: getId('READ_FAMILIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('supervisor'),
        permissionId: getId('UPDATE_FAMILIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('supervisor'),
        permissionId: getId('DELETE_FAMILIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('guardian'),
        permissionId: getId('READ_FAMILIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('guardian'),
        permissionId: getId('UPDATE_FAMILIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('content_manager'),
        permissionId: getId('READ_FAMILIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('family_admin'),
        permissionId: getId('READ_FAMILIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('family_admin'),
        permissionId: getId('UPDATE_FAMILIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('support_specialist'),
        permissionId: getId('READ_FAMILIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('supervisor'),
        permissionId: getId('CREATE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('supervisor'),
        permissionId: getId('READ_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('supervisor'),
        permissionId: getId('UPDATE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('supervisor'),
        permissionId: getId('DELETE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('guardian'),
        permissionId: getId('READ_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('guardian'),
        permissionId: getId('UPDATE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('content_manager'),
        permissionId: getId('READ_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('family_admin'),
        permissionId: getId('READ_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('family_admin'),
        permissionId: getId('UPDATE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('support_specialist'),
        permissionId: getId('READ_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('supervisor'),
        permissionId: getId('CREATE_SCREEN_TIME_ANALYSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('supervisor'),
        permissionId: getId('READ_SCREEN_TIME_ANALYSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('supervisor'),
        permissionId: getId('UPDATE_SCREEN_TIME_ANALYSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('supervisor'),
        permissionId: getId('DELETE_SCREEN_TIME_ANALYSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('guardian'),
        permissionId: getId('READ_SCREEN_TIME_ANALYSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('guardian'),
        permissionId: getId('UPDATE_SCREEN_TIME_ANALYSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('content_manager'),
        permissionId: getId('READ_SCREEN_TIME_ANALYSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('family_admin'),
        permissionId: getId('READ_SCREEN_TIME_ANALYSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('family_admin'),
        permissionId: getId('UPDATE_SCREEN_TIME_ANALYSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('support_specialist'),
        permissionId: getId('READ_SCREEN_TIME_ANALYSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('supervisor'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('guardian'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('content_manager'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('family_admin'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('support_specialist'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_ACTIVITIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_ACTIVITIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_ACTIVITIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_ACTIVITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_CHATS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_CHATS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_CHATS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_CHATS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_DASHBOARDS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_DASHBOARDS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_DASHBOARDS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_DASHBOARDS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_FAMILIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_FAMILIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_FAMILIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_FAMILIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_NOTIFICATIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_NOTIFICATIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_NOTIFICATIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_SCREEN_TIME_ANALYSES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_SCREEN_TIME_ANALYSES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_SCREEN_TIME_ANALYSES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_SCREEN_TIME_ANALYSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_ACTIVITIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_ACTIVITIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_ACTIVITIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_ACTIVITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_CHATS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_CHATS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_CHATS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_CHATS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_DASHBOARDS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_DASHBOARDS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_DASHBOARDS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_DASHBOARDS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_FAMILIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_FAMILIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_FAMILIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_FAMILIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_NOTIFICATIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_NOTIFICATIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_NOTIFICATIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_SCREEN_TIME_ANALYSES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_SCREEN_TIME_ANALYSES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_SCREEN_TIME_ANALYSES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_SCREEN_TIME_ANALYSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_ROLES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_PERMISSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_FAMILY'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_FAMILY'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_FAMILY'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_FAMILY'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_API_DOCS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_API_DOCS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_SEARCH'),
      },
    ]);

    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'SuperAdmin',
      )}' WHERE "email"='super_admin@flatlogic.com'`,
    );
    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'Administrator',
      )}' WHERE "email"='admin@flatlogic.com'`,
    );

    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'supervisor',
      )}' WHERE "email"='client@hello.com'`,
    );
    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'guardian',
      )}' WHERE "email"='john@doe.com'`,
    );
  },
};
