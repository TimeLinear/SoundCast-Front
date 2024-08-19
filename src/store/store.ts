import { configureStore } from "@reduxjs/toolkit";
import songSlice from "../features/songSlice";
import searchSlice from "../features/searchSlice";

const store = configureStore({
    reducer : {
        song : songSlice,
        search : searchSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export default store;