import { createSlice } from "@reduxjs/toolkit";

const connectionSlice=createSlice({ 
    name: 'connection',
    initialState: [] as any[], // Assuming connections are an array of objects
    reducers: {
        setConnections: (state, action) => {
            console.log(state);
            return action.payload;
        },      
        removeConnection: (state, action) => {
            return state.filter(connec => connec?._id !== action.payload._id);
        }
    }
})


export const { setConnections, removeConnection } = connectionSlice.actions;
export default connectionSlice.reducer;