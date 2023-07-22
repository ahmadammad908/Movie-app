// Import the functions you need from the SDKs you need
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  products: [],
  state: "loading",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => action.payload,
  },
});

export default productsSlice.reducer;
export const { setProducts } = productsSlice.actions;
