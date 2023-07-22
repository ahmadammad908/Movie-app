import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../categories/categoriesSlice";
import productsReducer from "../product/productsSlice";
const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
  },
});
export default store;
