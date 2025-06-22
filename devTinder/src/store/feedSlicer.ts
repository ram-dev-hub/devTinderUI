import { createSlice } from "@reduxjs/toolkit";
import type { UserState } from "./UserState";
const initialState: UserState[] = [];

const feedSlice = createSlice({
    name:'feed',
    initialState,
    reducers:{
        setFeed:(state,action)=>
        {
            console.log(state);
            return action.payload;
        },
        removefeedUser:(state, action) => {
            return state.filter(send => send && 'id' in send ? (send as any).id !== action.payload.id : true);
    }
}

});

export const { setFeed ,removefeedUser} = feedSlice.actions;
export default feedSlice.reducer;