import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initSearch } from "../type/SongType";


const searchSlice = createSlice({
    name : 'search',
    initialState : initSearch,
    reducers : {
        setKeyword : (state, action:PayloadAction<string>) => {
            return {...state, keyword:action.payload};
        },
        
        setPlaceNo : (state, action:PayloadAction<number>) => {
            if(action.payload) { return {...state, placeNo:action.payload} }
        },

        setMood : (state, action:PayloadAction<number>) => {
            if(action.payload) { return {...state, mood:action.payload} }
        },

        setGenre : (state, action:PayloadAction<number>) => {
            if(action.payload) { return {...state, mood:action.payload} }
        }
    }  
})

export const {setKeyword, setPlaceNo, setGenre, setMood} = searchSlice.actions;
export default searchSlice.reducer;