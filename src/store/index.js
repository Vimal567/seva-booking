import { configureStore } from '@reduxjs/toolkit';
import sevasReducer from './sevaSlice';
import userReducer from './userSlice';
import ordersReducer from './orderSlice';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    sevas: sevasReducer,
    user: userReducer,
    orders: ordersReducer,
    cart: cartReducer
  }
});
