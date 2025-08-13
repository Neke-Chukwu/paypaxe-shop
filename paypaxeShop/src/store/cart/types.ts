export type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

export type AddItemPayload = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
};

export type UpdateQuantityPayload = {
  id: string;
  delta: number; // +1 or -1
};

export type RemoveItemPayload = {
  id: string;
};

export type CartState = {
  items: CartItem[];
};

export const initialState: CartState = {
  items: [],
};
