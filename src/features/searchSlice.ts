import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initSearch } from "../type/SongType";


const searchSlice = createSlice({
    name : 'search',
    initialState : initSearch,
    reducers : {
        setKeyword : (state, action:PayloadAction<string>) => {
            console.log("키워드 설정 : " + action.payload);
            return {...state, keyword:action.payload};
        },
        
        // 수정 (24-08-22) -----
        setPlaceNo : (state, action:PayloadAction<number>) => {
            return {...state, placeNo:action.payload};
        },
        //-------- 

        setMood : (state, action:PayloadAction<number>) => {
            console.log("분위기 설정 : " + action.payload);
            return {...state, mood:action.payload};
        },

        setGenre : (state, action:PayloadAction<number>) => {
            console.log("장르 설정 : " + action.payload);
            return {...state, genre:action.payload};
        }
    }  
})

export const {setKeyword, setPlaceNo, setGenre, setMood} = searchSlice.actions;
export default searchSlice.reducer;