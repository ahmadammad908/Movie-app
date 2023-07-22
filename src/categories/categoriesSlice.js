import { createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase-config";
const initialState = {
  categories: [],
  state: "loading",
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action) => action.payload,
  },
});

export default categoriesSlice.reducer;
export const { setCategories } = categoriesSlice.actions;
