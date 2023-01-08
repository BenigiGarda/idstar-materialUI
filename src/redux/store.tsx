import { configureStore } from "@reduxjs/toolkit";
import userIdSlices from "./slices/userIdSlice";
export const store = configureStore({
  reducer: {
    idState: userIdSlices,
  },
});
