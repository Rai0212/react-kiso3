// 参考：https://qiita.com/Jiei-S/items/dc7c70531a3d3a1ed2a7

import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./bookSlice";

const store = configureStore({
  reducer: {
    book: bookReducer,
  },
});

export default store;
