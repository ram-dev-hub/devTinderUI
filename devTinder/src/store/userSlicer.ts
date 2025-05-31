import { createSlice } from '@reduxjs/toolkit';
import type { UserState } from './UserState';

const initialState: UserState = {
    email: '',
    firstName: '',
    lastName: '',
    aboutUs: '',
    age: 10,
    password: '',
    skills: [],
    imageUrl: ''

};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.email = action.payload.email;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.aboutUs = action.payload.aboutUs;
            state.age = action.payload.age;
            state.imageUrl = action.payload.imageUrl;
        },
        removeUser: (state) => {
            state.email = '';
            state.firstName = '';
            state.lastName ='';
            state.aboutUs = '';
            state.age = 10;
            state.imageUrl = '';
        },
    },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;