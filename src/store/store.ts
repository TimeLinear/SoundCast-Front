import { configureStore } from "@reduxjs/toolkit";
import songSlice from "../features/songSlice";
import searchSlice from "../features/searchSlice";
import memberSlice from "../features/memberSlice";

const store = configureStore({
    reducer : {
        song : songSlice,
        search : searchSlice,
        member : memberSlice
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
