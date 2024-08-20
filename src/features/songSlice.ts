import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initSong, initSongList, Song } from "../type/SongType";

const songSlice = createSlice({
    name : 'songs',
    initialState : {list:initSongList, currentSong:initSong},
    reducers : {
        setSongList : (state, action:PayloadAction<typeof initSongList>)=>{
            if(action.payload){
                state.list = action.payload;
            } else {
                state.list = initSongList;
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