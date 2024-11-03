import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name: 'storeCounter', 
    initialState: {
        value: 999, 
    }, 
    reducers : {
        incrementStore: (state) => {
            state.value += 1;
        }, 
        decrementStore: (state) => {
            state.value -= 1;
        }, 
        incrementByAmount: (state, action) => {
            state.value += action.payload
        }, 
    }, 
});

export const { incrementStore , decrementStore, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;