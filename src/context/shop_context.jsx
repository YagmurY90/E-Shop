import { useTranslation } from "react-i18next";
import { createContext, useState, useEffect } from "react";
import { PRODUCTS } from "../products";
import toast from "react-hot-toast";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i < PRODUCTS.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

export const ShopContextProvider = (props) => {
  const { t } = useTranslation();

  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [favorites, setFavorites] = useState([]);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const [selectedItems, setSelectedItems] = useState([]); // ✅ Checkbox için

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

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
        let itemInfo = PRODUCTS.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  const getSelectedTotalAmount = () => {
    let total = 0;
    for (const itemId of selectedItems) {
      if (cartItems[itemId] > 0) {
        const itemInfo = PRODUCTS.find((p) => p.id === Number(itemId));
        total += cartItems[itemId] * itemInfo.price;
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
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    toast.success(t("added_to_cart"), {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  const removeFromCart = (itemId) => {
  setCartItems((prev) => {
    const current = prev[itemId];
    const newCount = current > 0 ? current - 1 : 0;
    return { ...prev, [itemId]: newCount };
  });
};


  const removeItemFromCart = (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      updated[itemId] = 0;
      return updated;
    });
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const checkout = () => {
    setCartItems(getDefaultCart());
    setSelectedItems([]); // ödeme sonrası seçilenleri de sıfırla
  };

  const contextValue = {
    cartItems,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    removeItemFromCart,
    getTotalCartAmount,
    getSelectedTotalAmount, // ✅ yeni fonk
    selectedItems, // ✅ state
    toggleSelectItem, // ✅ fonk
    checkout,
    favorites,
    toggleFavorite,
    theme,
    toggleTheme,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
