import { createSlice } from "@reduxjs/toolkit";
import usersData from "../data/users.json";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
  },
  reducers: {
    loadUser: (state, action) => {
      // load by id or first user since you mentioned only to build frontend
      const user =
        usersData.find((u) => u.id === action.payload) || usersData[0];
      state.currentUser = user;
    },
  },
});

export const { loadUser } = userSlice.actions;
export default userSlice.reducer;
