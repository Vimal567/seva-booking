import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find((i) => i.id === item.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
    increaseQuantity: (state, action) => {
      const id = action.payload;
      const existing = state.items.find((i) => i.id === id);
      if (existing) {
        existing.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const existing = state.items.find((i) => i.id === id);
      if (existing && existing.quantity > 1) {
        existing.quantity -= 1;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
