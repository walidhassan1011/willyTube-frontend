import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  curreentVideo: null,
  loading: false,
  error: false,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.video = action.payload;
    },
    fetchFailed: (state) => {
      return initialState;
    },
    like: (state, action) => {
      if (!state.video.likes.includes(action.payload)) {
        state.video.likes.push(action.payload);
        state.video.dislikes.splice(
          state.video.dislikes.indexOf((userId) => userId === action.payload),
          1
        );
      }
    },
    dislike: (state, action) => {
      if (!state.video.dislikes.includes(action.payload)) {
        state.video.dislikes.push(action.payload);
        state.video.likes.splice(
          state.video.likes.indexOf((userId) => userId === action.payload),
          1
        );
      }
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailed, like, dislike } =
  videoSlice.actions;

export default videoSlice.reducer;
