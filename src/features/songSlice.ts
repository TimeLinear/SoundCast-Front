import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initSong, initSongList, Song } from "../type/SongType";

const songSlice = createSlice({
    name : 'songs',
    initialState : {list:initSongList, currentSong:initSong},
    reducers : {
        setSongList : (state, action:PayloadAction<typeof initSongList>)=>{
            console.log(action.payload);
            if(action.payload){return {...state, list:[...action.payload]}}
        },
        setPlaySong : (state, action:PayloadAction<number>) => {
            const selectedSong = state.list.find((value)=>value.songNo === action.payload);
            if(selectedSong){return {...state, currentSong:selectedSong}}
        }

    }
})

export const {setSongList, setPlaySong} = songSlice.actions;
export default songSlice.reducer;