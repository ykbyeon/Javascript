import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./storeCounter";

export default configureStore({
    reducer: {
        counter:counterReducer, 
    }, 
});