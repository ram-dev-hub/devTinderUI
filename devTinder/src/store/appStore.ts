import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlicer';
import feedSlice from './feedSlicer';

export const appStore = configureStore({
    reducer: {
        user: userSlice,
        feed:feedSlice,
    },
});

export default appStore;
