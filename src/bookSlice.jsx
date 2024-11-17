// 参考：https://qiita.com/Jiei-S/items/dc7c70531a3d3a1ed2a7

import { createSlice } from "@reduxjs/toolkit";

export const BOOK_SLICE_NAME = "book";

const initialState = {
  reviews: [],
  errorMessage: "",
  offset: 0,
  isLoading: false,
};

const bookSlice = createSlice({
  name: BOOK_SLICE_NAME,
  initialState,
  reducers: {
    setReviews: (state, action) => {
      state.reviews = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setOffset: (state, action) => {
      state.offset = action.payload;
    },
  },
});

export const { setReviews, setErrorMessage, setLoading, setOffset } = bookSlice.actions;
export default bookSlice.reducer;
