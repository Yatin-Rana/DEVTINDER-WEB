
import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: 'feed',
    initialState: [],
    reducers: {
        addFeed: (state, action) => {
            return Array.isArray(action.payload.data) ? action.payload.data : [];
        },
        removeUserFromFeed: (state, action) => state.filter(r => r._id !== action.payload)
    }
})

export const { addFeed, removeUserFromFeed } = feedSlice.actions;


export default feedSlice.reducer