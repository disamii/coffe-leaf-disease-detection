import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isUserLoggedIn: false,
    userData: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginRequest: (state, action) => {
            state.isUserLoggedIn = true;
            state.userData = action.payload
        },
        logoutRequest: (state) => {
            state.isUserLoggedIn = false;
            state.userData = null;
        }
    }
})

export const {loginRequest, logoutRequest} = authSlice.actions

export default authSlice.reducer