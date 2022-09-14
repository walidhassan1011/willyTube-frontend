import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    loginFailed: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      return initialState;
    },
    subscription: (state, action) => {
      if (state.user.subscribedUsers.includes(action.payload)) {
        state.user.subscribedUsers.splice(
          state.user.subscribedUsers.indexOf(
            (channedlId) => channedlId === action.payload
          )
        ),
          1;
      } else {
        state.user.subscribedUsers.push(action.payload);
      }
    },
  },
});

export const { login, loginSuccess, loginFailed, logout, subscription } =
  userSlice.actions;

export default userSlice.reducer;
