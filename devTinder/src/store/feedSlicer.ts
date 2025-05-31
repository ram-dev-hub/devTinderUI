import { createSlice } from "@reduxjs/toolkit";
import type { UserState } from "./UserState";

const initialState: UserState[] = [];

const feedSlice = createSlice({
    name:'feed',
    initialState,
    reducers:{
        setFeed:(state,action)=>
        {
            return action.payload;
        }
    }

});
export const { setFeed } = feedSlice.actions;
export default feedSlice.reducer;