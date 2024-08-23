import { configureStore } from "@reduxjs/toolkit";
import memberSlice from "../features/memberSlice";
import songSlice from "../features/songSlice";
import keywordSlice from "../features/keywordSlice";

let store = configureStore({
    reducer : {
        member : memberSlice,
        song : songSlice,
        keyword : keywordSlice
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>