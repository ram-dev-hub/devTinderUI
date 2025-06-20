import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlicer';
import feedSlice from './feedSlicer';
import connectionSlice from './connectionSlice';
import requestSlicer from './requestSlicer';

export const appStore = configureStore({
    reducer: {
        user: userSlice,
        feed:feedSlice,
        connections:connectionSlice,
        requests:requestSlicer
    },
});

export default appStore;
