import { createContext, useState, useEffect } from "react";
import { PRODUCTS } from "../products";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export const ShopContext = createContext(null); // Bunu UNUTMA!

export const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i <= PRODUCTS.length; i++) {
    cart[i] = 0;
  }
  return cart;
};

export const ShopContextProvider = (props) => {
  const { t } = useTranslation();

  const [cartItems, setCartItems] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const toggleFavorite = (itemId) => {
    setFavorites((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = PRODUCTS.find((product) => product.id === Number(item));
        if (itemInfo) {
          totalAmount += cartItems[item] * itemInfo.price;
        }
      }
    }
    return totalAmount;
  };

  const getSelectedTotalAmount = () => {
    let total = 0;
    for (const itemId of selectedItems) {
      if (cartItems[itemId] > 0) {
        const itemInfo = PRODUCTS.find((p) => p.id === Number(itemId));
        if (itemInfo) {
          total += cartItems[itemId] * itemInfo.price;
        }
      }
    }
    return total;
  };

  const toggleSelectItem = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
    }));
    toast.success(t("added_to_cart"), {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] > 0 ? prev[itemId] - 1 : 0,
    }));
  };

  const removeItemFromCart = (itemId) => {
  setCartItems((prev) => {
    const updated = { ...prev };
    delete updated[itemId];
    return updated;
  });

  setSelectedItems((prev) => prev.filter((id) => id !== itemId));
};


  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: newAmount,
    }));
  };

  const checkout = () => {
    setCartItems(getDefaultCart());
    setSelectedItems([]);
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    removeItemFromCart,
    updateCartItemCount,
    getTotalCartAmount,
    getSelectedTotalAmount,
    selectedItems,
    toggleSelectItem,
    checkout,
    favorites,
    toggleFavorite,
    theme,
    toggleTheme,
    selectedProduct,
    setSelectedProduct,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
