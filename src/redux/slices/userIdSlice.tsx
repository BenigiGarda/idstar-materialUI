import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 1,
};
export const userIdSlice = createSlice({
  name: "userIdState",
  initialState,
  reducers: {
    setUserIdState: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { setUserIdState } = userIdSlice.actions;

export default userIdSlice.reducer;
