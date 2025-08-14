import { createSlice } from "@reduxjs/toolkit";
import ordersData from "../data/orders.json";

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    list: [],
  },
  reducers: {
    loadOrders: (state, action) => {
      if (action.payload) {
        // filter by userId
        state.list = ordersData.filter(
          (order) => order.userId === action.payload
        );
      } else {
        state.list = ordersData;
      }
    },
  },
});

export const { loadOrders } = orderSlice.actions;
export default orderSlice.reducer;
