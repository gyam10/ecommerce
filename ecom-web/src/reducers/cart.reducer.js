import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  CartDetail: [],
};

export const CartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    setCartDetail: (state, actions) => {
      console.log("actions", actions);
    },
    addAnItemToCart: (state, actions) => {},
  },
});

export const { setCartDetail, addAnItemToCart } = CartSlice.actions;
export default CartSlice.reducer;
