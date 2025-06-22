import { createSlice } from "@reduxjs/toolkit";

const requestSlicer = createSlice({
name: 'request',
initialState: [] as any[], // Assuming requests are an array of objects
reducers:{
    setRequests: (state, action) => {
        console.log(state);
        return action.payload;
    },
    removeRequest: (state, action) => {
        return state.filter(req => req?._id !== action.payload._id);
    }
}
}
)
export const { setRequests, removeRequest } = requestSlicer.actions;
export default requestSlicer.reducer;

