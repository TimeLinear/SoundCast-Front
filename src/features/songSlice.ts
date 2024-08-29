import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initGenres, initMoods, initSong, initSongList, Song } from "../type/SongType";

const songSlice = createSlice({
    name : 'songs',
    initialState : {list:initSongList, currentSong:initSong, genreList:initGenres, moodList:initMoods},
    reducers : {
        setSongList : (state, action:PayloadAction<typeof initSongList>)=>{
            console.log(action.payload);
            if(action.payload){return {...state, list:[...action.payload]}}
        },
        setPlaySong : (state, action:PayloadAction<number>) => {
            if(action.payload === 0) {return {...state, currentSong:initSong}}
            const selectedSong = state.list.find((value)=>value.songNo === action.payload);
            if(selectedSong){return {...state, currentSong:selectedSong}}
        },
        setGenreList : (state, action:PayloadAction<typeof initGenres>) => {
            if(action.payload){return {...state, genreList:[...action.payload]}}
        },
        setMoodList : (state, action:PayloadAction<typeof initMoods>) => {
            if(action.payload){return {...state, moodList:[...action.payload]}}
        }


    }
})

export const {setSongList, setPlaySong, setGenreList, setMoodList} = songSlice.actions;
export default songSlice.reducer;