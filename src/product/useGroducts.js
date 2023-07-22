import React from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { db } from "../firebase-config";
import { setCategories } from "../categories/categoriesSlice";
import { setProducts } from "../product/productsSlice";

const useProducts = () => {
  const dispatch = useDispatch();

  // async function getAllFeeds({ onSuccess, onFailure, category }) {
  //   try {
  //     /**
  //      * All products reference.
  //      */
  //     const videosRef = collection(db, "videos");

  //     /**
  //      * Products by category reference
  //      */
  //     const productsByCatRef = query(
  //       videosRef,
  //       where("category", "==", category)
  //     );

  //     const querySnapshot = await getDocs(
  //       category ? productsByCatRef : videosRef
  //     );
  //     const videos = [];

  //     querySnapshot.forEach((doc) => {
  //       videos.push({
  //         ...doc.data(),
  //         id: doc.id,
  //       });
  //       // doc.data() is never undefined for query doc snapshots
  //       console.log(doc.id, " => ", doc.data());
  //     });

  //     dispatch(
  //       setProducts({
  //         videos,
  //         state: "loaded",
  //       })
  //     );
  //   } catch (error) {
  //     dispatch(
  //       setProducts({
  //         videos: [],
  //         state: "failed",
  //       })
  //     );
  //   }
  // }

  async function getCategories({ onSuccess, onFailure }) {
    try {
      const q = collection(db, "categories");

      const querySnapshot = await getDocs(q);
      const categories = [];

      querySnapshot.forEach((doc) => {
        categories.push(doc.data());
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
      dispatch(
        setCategories({
          categories,
          state: "loaded",
        })
      );
    } catch (error) {
      dispatch(
        setCategories({
          categories: [],
          state: "failed",
        })
      );
    }
  }

  return { getCategories };
};

export default useProducts;
