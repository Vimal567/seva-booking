import { configureStore } from '@reduxjs/toolkit';
import sevasReducer from './sevaSlice';
import userReducer from './userSlice';
import ordersReducer from './orderSlice';

export const store = configureStore({
  reducer: {
    sevas: sevasReducer,
    user: userReducer,
    orders: ordersReducer
  }
});
