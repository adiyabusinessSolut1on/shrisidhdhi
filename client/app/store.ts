// app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducer/cartReducer'; // Ensure this path is correct

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
