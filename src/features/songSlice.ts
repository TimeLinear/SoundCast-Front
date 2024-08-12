import { createSlice } from "@reduxjs/toolkit";
import { initSong } from "../type/SongType";

const songSlice = createSlice({
    name : 'song',
    initialState : initSong, 
    reducers : {
        



    }
})

export const {} = songSlice.actions;
export default songSlice.reducer;