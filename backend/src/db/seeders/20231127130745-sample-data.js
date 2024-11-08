const db = require('../models');
const Users = db.users;

const Activities = db.activities;

const Chats = db.chats;

const Dashboards = db.dashboards;

const Families = db.families;

const Notifications = db.notifications;

const ScreenTimeAnalyses = db.screen_time_analyses;

const Family = db.family;

const ActivitiesData = [
  {
    name: 'Math Quiz',

    type: 'offline',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    name: 'Outdoor Play',

    type: 'educational',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    name: 'Science Experiment',

    type: 'educational',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    name: 'Drawing Session',

    type: 'offline',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },
];

const ChatsData = [
  {
    // type code here for "relation_one" field

    message: "Don't forget your math class!",

    timestamp: new Date('2023-10-01T10:00:00Z'),

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    message: 'Time for a science project!',

    timestamp: new Date('2023-10-01T14:00:00Z'),

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    message: 'History review starts soon.',

    timestamp: new Date('2023-10-01T11:00:00Z'),

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    message: 'Art class is about to begin.',

    timestamp: new Date('2023-10-01T13:00:00Z'),

    // type code here for "relation_one" field
  },
];

const DashboardsData = [
  {
    // type code here for "relation_one" field

    schedule: 'Math class at 10 AM',

    mood_check_in: 'Happy',

    goal_tracker: 'Complete 5 lessons',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    schedule: 'Science project at 2 PM',

    mood_check_in: 'Excited',

    goal_tracker: 'Read 3 books',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    schedule: 'History review at 11 AM',

    mood_check_in: 'Focused',

    goal_tracker: 'Finish homework',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    schedule: 'Art class at 1 PM',

    mood_check_in: 'Creative',

    goal_tracker: 'Draw 2 sketches',

    // type code here for "relation_one" field
  },
];

const FamiliesData = [
  {
    name: 'Doe Family',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    name: 'Smith Family',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    name: 'Brown Family',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    name: 'Johnson Family',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },
];

const NotificationsData = [
  {
    // type code here for "relation_one" field

    content: 'Goal achieved: 5 lessons completed!',

    sent_at: new Date('2023-10-01T18:00:00Z'),

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    content: 'Screen time limit reached.',

    sent_at: new Date('2023-10-01T19:00:00Z'),

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    content: 'New activity suggestion: Outdoor Play',

    sent_at: new Date('2023-10-01T20:00:00Z'),

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    content: 'Reminder: Art class at 1 PM',

    sent_at: new Date('2023-10-01T21:00:00Z'),

    // type code here for "relation_one" field
  },
];

const ScreenTimeAnalysesData = [
  {
    // type code here for "relation_one" field

    usage_hours: 2.5,

    recommendations: 'Reduce screen time by 30 minutes',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    usage_hours: 3,

    recommendations: 'Try more outdoor activities',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    usage_hours: 1.5,

    recommendations: 'Maintain current balance',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    usage_hours: 4,

    recommendations: 'Limit screen time to 3 hours',

    // type code here for "relation_one" field
  },
];

const FamilyData = [
  {
    name: 'Edward Teller',
  },

  {
    name: 'Karl Landsteiner',
  },

  {
    name: 'Ernst Mayr',
  },

  {
    name: 'Jonas Salk',
  },
];

// Similar logic for "relation_many"

async function associateUserWithFamily() {
  const relatedFamily0 = await Family.findOne({
    offset: Math.floor(Math.random() * (await Family.count())),
  });
  const User0 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (User0?.setFamily) {
    await User0.setFamily(relatedFamily0);
  }

  const relatedFamily1 = await Family.findOne({
    offset: Math.floor(Math.random() * (await Family.count())),
  });
  const User1 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (User1?.setFamily) {
    await User1.setFamily(relatedFamily1);
  }

  const relatedFamily2 = await Family.findOne({
    offset: Math.floor(Math.random() * (await Family.count())),
  });
  const User2 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (User2?.setFamily) {
    await User2.setFamily(relatedFamily2);
  }

  const relatedFamily3 = await Family.findOne({
    offset: Math.floor(Math.random() * (await Family.count())),
  });
  const User3 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (User3?.setFamily) {
    await User3.setFamily(relatedFamily3);
  }
}

// Similar logic for "relation_many"

async function associateActivityWithFamily() {
  const relatedFamily0 = await Family.findOne({
    offset: Math.floor(Math.random() * (await Family.count())),
  });
  const Activity0 = await Activities.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Activity0?.setFamily) {
    await Activity0.setFamily(relatedFamily0);
  }

  const relatedFamily1 = await Family.findOne({
    offset: Math.floor(Math.random() * (await Family.count())),
  });
  const Activity1 = await Activities.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Activity1?.setFamily) {
    await Activity1.setFamily(relatedFamily1);
  }

  const relatedFamily2 = await Family.findOne({
    offset: Math.floor(Math.random() * (await Family.count())),
  });
  const Activity2 = await Activities.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Activity2?.setFamily) {
    await Activity2.setFamily(relatedFamily2);
  }

  const relatedFamily3 = await Family.findOne({
    offset: Math.floor(Math.random() * (await Family.count())),
  });
  const Activity3 = await Activities.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Activity3?.setFamily) {
    await Activity3.setFamily(relatedFamily3);
  }
}

async function associateChatWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Chat0 = await Chats.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Chat0?.setUser) {
    await Chat0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Chat1 = await Chats.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Chat1?.setUser) {
    await Chat1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Chat2 = await Chats.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Chat2?.setUser) {
    await Chat2.setUser(relatedUser2);
  }

  const relatedUser3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Chat3 = await Chats.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Chat3?.setUser) {
    await Chat3.setUser(relatedUser3);
  }
}

async function associateChatWithFamily() {
  const relatedFamily0 = await Family.findOne({
    offset: Math.floor(Math.random() * (await Family.count())),
  });
  const Chat0 = await Chats.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Chat0?.setFamily) {
    await Chat0.setFamily(relatedFamily0);
  }

  const relatedFamily1 = await Family.findOne({
    offset: Math.floor(Math.random() * (await Family.count())),
  });
  const Chat1 = await Chats.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Chat1?.setFamily) {
    await Chat1.setFamily(relatedFamily1);
  }

  const relatedFamily2 = await Family.findOne({
    offset: Math.floor(Math.random() * (await Family.count())),
  });
  const Chat2 = await Chats.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Chat2?.setFamily) {
    await Chat2.setFamily(relatedFamily2);
  }

  const relatedFamily3 = await Family.findOne({
    offset: Math.floor(Math.random() * (await Family.count())),
  });
  const Chat3 = await Chats.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Chat3?.setFamily) {
    await Chat3.setFamily(relatedFamily3);
  }
}

async function associateDashboardWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Dashboard0 = await Dashboards.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Dashboard0?.setUser) {
    await Dashboard0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Dashboard1 = await Dashboards.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Dashboard1?.setUser) {
    await Dashboard1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Dashboard2 = await Dashboards.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Dashboard2?.setUser) {
    await Dashboard2.setUser(relatedUser2);
  }

  const relatedUser3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Dashboard3 = await Dashboards.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Dashboard3?.setUser) {
    await Dashboard3.setUser(relatedUser3);
  }
}

async function associateDashboardWithFamily() {
  const relatedFamily0 = await Family.findOne({
    offset: Math.floor(Math.random() * (await Family.count())),
  });
  const Dashboard0 = await Dashboards.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Dashboard0?.setFamily) {
    await Dashboard0.setFamily(relatedFamily0);
  }

  const relatedFamily1 = await Family.findOne({
    offset: Math.floor(Math.random() * (await Family.count())),
  });
  const Dashboard1 = await Dashboards.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Dashboard1?.setFamily) {
    await Dashboard1.setFamily(relatedFamily1);
  }

  const relatedFamily2 = await Family.findOne({
    offset: Math.floor(Math.random() * (await Family.count())),
  });
  const Dashboard2 = await Dashboards.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Dashboard2?.setFamily) {
    await Dashboard2.setFamily(relatedFamily2);
  }

  const relatedFamily3 = await Family.findOne({
    offset: Math.floor(Math.random() * (await Family.count())),
  });
  const Dashboard3 = await Dashboards.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Dashboard3?.setFamily) {
    await Dashboard3.setFamily(relatedFamily3);
  }
}

// Similar logic for "relation_many"

async function associateFamilyWithFamily() {
  const relatedFamily0 = await Family.findOne({
    offset: Math.floor(Math.random() * (await Family.count())),
  });
  const Family0 = await Families.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Family0?.setFamily) {
    await Family0.setFamily(relatedFamily0);
  }

  const relatedFamily1 = await Family.findOne({
    offset: Math.floor(Math.random() * (await Family.count())),
  });
  const Family1 = await Families.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Family1?.setFamily) {
    await Family1.setFamily(relatedFamily1);
  }

  const relatedFamily2 = await Family.findOne({
    offset: Math.floor(Math.random() * (await Family.count())),
  });
  const Family2 = await Families.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Family2?.setFamily) {
    await Family2.setFamily(relatedFamily2);
  }

  const relatedFamily3 = await Family.findOne({
    offset: Math.floor(Math.random() * (await Family.count())),
  });
  const Family3 = await Families.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Family3?.setFamily) {
    await Family3.setFamily(relatedFamily3);
  }
}

async function associateNotificationWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Notification0 = await Notifications.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Notification0?.setUser) {
    await Notification0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Notification1 = await Notifications.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Notification1?.setUser) {
    await Notification1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Notification2 = await Notifications.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Notification2?.setUser) {
    await Notification2.setUser(relatedUser2);
  }

  const relatedUser3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Notification3 = await Notifications.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Notification3?.setUser) {
    await Notification3.setUser(relatedUser3);
  }
}

async function associateNotificationWithFamily() {
  const relatedFamily0 = await Family.findOne({
    offset: Math.floor(Math.random() * (await Family.count())),
  });
  const Notification0 = await Notifications.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Notification0?.setFamily) {
    await Notification0.setFamily(relatedFamily0);
  }

  const relatedFamily1 = await Family.findOne({
    offset: Math.floor(Math.random() * (await Family.count())),
  });
  const Notification1 = await Notifications.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Notification1?.setFamily) {
    await Notification1.setFamily(relatedFamily1);
  }

  const relatedFamily2 = await Family.findOne({
    offset: Math.floor(Math.random() * (await Family.count())),
  });
  const Notification2 = await Notifications.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Notification2?.setFamily) {
    await Notification2.setFamily(relatedFamily2);
  }

  const relatedFamily3 = await Family.findOne({
    offset: Math.floor(Math.random() * (await Family.count())),
  });
  const Notification3 = await Notifications.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Notification3?.setFamily) {
    await Notification3.setFamily(relatedFamily3);
  }
}

async function associateScreenTimeAnalysisWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const ScreenTimeAnalysis0 = await ScreenTimeAnalyses.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (ScreenTimeAnalysis0?.setUser) {
    await ScreenTimeAnalysis0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const ScreenTimeAnalysis1 = await ScreenTimeAnalyses.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (ScreenTimeAnalysis1?.setUser) {
    await ScreenTimeAnalysis1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const ScreenTimeAnalysis2 = await ScreenTimeAnalyses.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (ScreenTimeAnalysis2?.setUser) {
    await ScreenTimeAnalysis2.setUser(relatedUser2);
  }

  const relatedUser3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const ScreenTimeAnalysis3 = await ScreenTimeAnalyses.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (ScreenTimeAnalysis3?.setUser) {
    await ScreenTimeAnalysis3.setUser(relatedUser3);
  }
}

async function associateScreenTimeAnalysisWithFamily() {
  const relatedFamily0 = await Family.findOne({
    offset: Math.floor(Math.random() * (await Family.count())),
  });
  const ScreenTimeAnalysis0 = await ScreenTimeAnalyses.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (ScreenTimeAnalysis0?.setFamily) {
    await ScreenTimeAnalysis0.setFamily(relatedFamily0);
  }

  const relatedFamily1 = await Family.findOne({
    offset: Math.floor(Math.random() * (await Family.count())),
  });
  const ScreenTimeAnalysis1 = await ScreenTimeAnalyses.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (ScreenTimeAnalysis1?.setFamily) {
    await ScreenTimeAnalysis1.setFamily(relatedFamily1);
  }

  const relatedFamily2 = await Family.findOne({
    offset: Math.floor(Math.random() * (await Family.count())),
  });
  const ScreenTimeAnalysis2 = await ScreenTimeAnalyses.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (ScreenTimeAnalysis2?.setFamily) {
    await ScreenTimeAnalysis2.setFamily(relatedFamily2);
  }

  const relatedFamily3 = await Family.findOne({
    offset: Math.floor(Math.random() * (await Family.count())),
  });
  const ScreenTimeAnalysis3 = await ScreenTimeAnalyses.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (ScreenTimeAnalysis3?.setFamily) {
    await ScreenTimeAnalysis3.setFamily(relatedFamily3);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Activities.bulkCreate(ActivitiesData);

    await Chats.bulkCreate(ChatsData);

    await Dashboards.bulkCreate(DashboardsData);

    await Families.bulkCreate(FamiliesData);

    await Notifications.bulkCreate(NotificationsData);

    await ScreenTimeAnalyses.bulkCreate(ScreenTimeAnalysesData);

    await Family.bulkCreate(FamilyData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateUserWithFamily(),

      // Similar logic for "relation_many"

      await associateActivityWithFamily(),

      await associateChatWithUser(),

      await associateChatWithFamily(),

      await associateDashboardWithUser(),

      await associateDashboardWithFamily(),

      // Similar logic for "relation_many"

      await associateFamilyWithFamily(),

      await associateNotificationWithUser(),

      await associateNotificationWithFamily(),

      await associateScreenTimeAnalysisWithUser(),

      await associateScreenTimeAnalysisWithFamily(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('activities', null, {});

    await queryInterface.bulkDelete('chats', null, {});

    await queryInterface.bulkDelete('dashboards', null, {});

    await queryInterface.bulkDelete('families', null, {});

    await queryInterface.bulkDelete('notifications', null, {});

    await queryInterface.bulkDelete('screen_time_analyses', null, {});

    await queryInterface.bulkDelete('family', null, {});
  },
};
