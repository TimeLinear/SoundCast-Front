import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const keywordSlice = createSlice({
    name : 'keyword',
    initialState : '',
    reducers : {
        setKeyword : (state, action:PayloadAction<string>) => {
            return action.payload;
        }

    }  
})

export const {setKeyword} = keywordSlice.actions;
export default keywordSlice.reducer;