import { configureStore } from "@reduxjs/toolkit";
import songSlice from "../features/songSlice";
import keywordSlice from "../features/keywordSlice";

const store = configureStore({
    reducer : {
        song : songSlice,
        keyword : keywordSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export default store;