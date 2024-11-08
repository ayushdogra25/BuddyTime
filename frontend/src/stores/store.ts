import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';
import openAiSlice from './openAiSlice';

import usersSlice from './users/usersSlice';
import activitiesSlice from './activities/activitiesSlice';
import chatsSlice from './chats/chatsSlice';
import dashboardsSlice from './dashboards/dashboardsSlice';
import familiesSlice from './families/familiesSlice';
import notificationsSlice from './notifications/notificationsSlice';
import screen_time_analysesSlice from './screen_time_analyses/screen_time_analysesSlice';
import rolesSlice from './roles/rolesSlice';
import permissionsSlice from './permissions/permissionsSlice';
import familySlice from './family/familySlice';

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,
    openAi: openAiSlice,

    users: usersSlice,
    activities: activitiesSlice,
    chats: chatsSlice,
    dashboards: dashboardsSlice,
    families: familiesSlice,
    notifications: notificationsSlice,
    screen_time_analyses: screen_time_analysesSlice,
    roles: rolesSlice,
    permissions: permissionsSlice,
    family: familySlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
