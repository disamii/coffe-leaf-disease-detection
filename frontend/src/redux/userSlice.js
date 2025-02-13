import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, 
};

// Create Redux slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload; 
    },
    logout: (state) => {
      state.user = null; 
    },
  },
});

// Export actions
export const { login, logout } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
