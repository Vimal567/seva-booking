import { createSlice } from "@reduxjs/toolkit";
import sevasData from "../data/sevas.json";

const sevaSlice = createSlice({
  name: "sevas",
  initialState: {
    list: [],
    status: "idle",
  },
  reducers: {
    loadSevas: (state) => {
      state.list = sevasData;
      state.status = "loaded";
    },
  },
});

export const { loadSevas } = sevaSlice.actions;
export default sevaSlice.reducer;
