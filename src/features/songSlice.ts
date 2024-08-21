import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initSong, initSongs, Song } from "../type/SongType";

const songSlice = createSlice({
    name : 'songs',
    initialState : {list:initSongs, currentSong:initSong},
    reducers : {
        setSongList : (state, action:PayloadAction<typeof initSongs>)=>{
            if(action.payload){
                state.list = action.payload;
            } else {
                state.list = initSongs;
            }
        },

        setPlaySong : (state, action:PayloadAction<number>) => {
            const selectedSong = state.list.find((value)=>value.songNo === action.payload);
            
            if(selectedSong){
                state.currentSong = selectedSong;
            } 
        }

    }
})

export const {setSongList, setPlaySong} = songSlice.actions;
export default songSlice.reducer;