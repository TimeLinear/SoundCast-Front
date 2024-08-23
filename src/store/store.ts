import { configureStore } from "@reduxjs/toolkit";
import memberSlice from "../features/memberSlice";
import songSlice from "../features/songSlice";

let store = configureStore({
    reducer : {
        member : memberSlice,
        song : songSlice
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>