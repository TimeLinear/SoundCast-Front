import { configureStore } from "@reduxjs/toolkit";
import memberSlice from "../features/memberSlice";

let store = configureStore({
    reducer : {
        member : memberSlice
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>