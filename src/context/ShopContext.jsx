import React, { createContext, useState, useContext, useCallback } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    const savedOrders = localStorage.getItem("orderHistory");
    return {
      products: [],
      cart: [],
      orderHistory: savedOrders ? JSON.parse(savedOrders) : [],
      loading: false,
      searchTerm: "",
    };
  });

  const fetchProducts = useCallback(async (query = "") => {
    setState((prev) => ({ ...prev, loading: true }));

    try {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}&a=Canadian`;
      const response = await axios.get(endpoint);

      const formattedProducts = (response.data.meals || []).map((meal) => ({
        id: meal.idMeal,
        name: meal.strMeal,
        image: meal.strMealThumb,
        price: Math.floor(Math.random() * 100000) + 10000,
        stock: Math.floor(Math.random() * 10) + 1,
      }));

      setState((prev) => ({
        ...prev,
        products: formattedProducts,
        loading: false,
        searchTerm: query,
      }));
    } catch (error) {
      console.error("Error fetching products:", error);
      setState((prev) => ({ ...prev, loading: false }));
    }
  }, []);
  const addToCart = (product) => {
    setState((prev) => {
      const existingItem = prev.cart.find((item) => item.id === product.id);
      const updatedCart = existingItem
        ? prev.cart.map((item) => (item.id === product.id ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) } : item))
        : [...prev.cart, { ...product, quantity: 1 }];

      return { ...prev, cart: updatedCart };
    });
  };

  const updateQuantity = (id, amount) => {
    setState((prev) => {
      const updatedCart = prev.cart
        .map((item) => {
          if (item.id === id) {
            const newQuantity = item.quantity + amount;
            if (newQuantity < 1) return null;
            if (newQuantity > item.stock) return item;
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter(Boolean);

      return { ...prev, cart: updatedCart };
    });
  };

  const removeFromCart = (id) => {
    setState((prev) => ({
      ...prev,
      cart: prev.cart.filter((item) => item.id !== id),
    }));
  };
  const checkout = useCallback(
    (navigate) => {
      const total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const newOrder = {
        date: new Date().toISOString(),
        items: [...state.cart],
        total,
      };

      const updatedHistory = [newOrder, ...state.orderHistory];

      localStorage.setItem("orderHistory", JSON.stringify(updatedHistory));
      setState((prev) => ({
        ...prev,
        orderHistory: updatedHistory,
        cart: [],
      }));
      return Swal.fire({
        title: "Checkout Berhasil!",
        html: `
        <div style="text-align: center;">
          <p>Total Pembayaran: <b>Rp${total.toLocaleString("id-ID")}</b></p>
          <p>Jumlah Item: ${state.cart.length}</p>
        </div>
      `,
        icon: "success",
        confirmButtonText: "Lihat Riwayat",
        cancelButtonText: "Lanjut Belanja",
        showCancelButton: true,
        focusConfirm: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/order-history");
        }
      });
    },
    [state.cart, state.orderHistory]
  );

  const setSearchTerm = (term) => {
    setState((prev) => ({ ...prev, searchTerm: term }));
  };

  return (
    <ShopContext.Provider
      value={{
        products: state.products,
        cart: state.cart,
        orderHistory: state.orderHistory,
        loading: state.loading,
        searchTerm: state.searchTerm,
        setSearchTerm,
        fetchProducts,
        addToCart,
        updateQuantity,
        removeFromCart,
        checkout,
      }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};
