import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {
  AddItemPayload,
  CartItem,
  CartState,
  RemoveItemPayload,
  UpdateQuantityPayload,
} from "./types";

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<AddItemPayload>) => {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        const newItem: CartItem = { ...action.payload, quantity: 1 };
        state.items.push(newItem);
      }
    },
    removeItemFromCart: (state, action: PayloadAction<RemoveItemPayload>) => {
      state.items = state.items.filter((i) => i.id !== action.payload.id);
    },
    updateQuantity: (state, action: PayloadAction<UpdateQuantityPayload>) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (!item) return;
      item.quantity += action.payload.delta;
      if (item.quantity <= 0) {
        state.items = state.items.filter((i) => i.id !== action.payload.id);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItemToCart, removeItemFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
