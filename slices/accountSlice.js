import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: { },
});

export const { } = accountSlice.actions;
export default accountSlice.reducer;