import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

interface CartState {
  items: CartItem[];
  totalPrice: number;
}


const isClient = typeof window !== 'undefined';

const loadCartState = (): CartState => {
  if (isClient) {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  }
  return { items: [], totalPrice: 0 };
};

const initialState: CartState = loadCartState();

const calculateTotalPrice = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

const saveCartState = (state: CartState) => {
  if (isClient) {
    localStorage.setItem('cart', JSON.stringify(state));
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingProduct = state.items.find(item => item.id === action.payload.id);
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.items.push({ ...action.payload, quantity: action.payload.quantity });
      }
      state.totalPrice = calculateTotalPrice(state.items);
      saveCartState(state);
    },
    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
      state.totalPrice = calculateTotalPrice(state.items);
      saveCartState(state);
    },
    incrementQuantity: (state, action: PayloadAction<{ id: string }>) => {
      const product = state.items.find(item => item.id === action.payload.id);
      if (product) {
        product.quantity += 1;
      }
      state.totalPrice = calculateTotalPrice(state.items);
      saveCartState(state);
    },
    decrementQuantity: (state, action: PayloadAction<{ id: string }>) => {
      const product = state.items.find(item => item.id === action.payload.id);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
      state.totalPrice = calculateTotalPrice(state.items);
      saveCartState(state);
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
