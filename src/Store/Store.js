import { configureStore } from "@reduxjs/toolkit";
import GetUserSlice from "./GetUserSlice";
import updateSlice from "./PostUserSlice";

const store = configureStore({
  reducer: {
    getUser: GetUserSlice.reducer,
    postUser: updateSlice.reducer
  }
});
export default store;
