import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
  const { t } = useTranslation();

  const [cartItems, setCartItems] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productList, setProductList] = useState([]);

  // 🛍️ Ürünleri API'den çek
  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=24")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.products.map((item) => ({
          id: item.id,
          productName: item.title,
          price: item.price,
          productImage: item.thumbnail,
          description: item.description,
        }));
        setProductList(formatted);
      });
  }, []);

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
    let total = 0;
    for (const itemId in cartItems) {
      const product = productList.find((p) => p.id === Number(itemId));
      if (product) {
        total += cartItems[itemId] * product.price;
      }
    }
    return total;
  };

  const getSelectedTotalAmount = () => {
    let total = 0;
    for (const itemId of selectedItems) {
      const product = productList.find((p) => p.id === Number(itemId));
      if (product && cartItems[itemId]) {
        total += cartItems[itemId] * product.price;
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
    setCartItems((prev) => {
      const current = prev[itemId] || 0;
      const updated = { ...prev };
      updated[itemId] = current > 0 ? current - 1 : 0;
      return updated;
    });
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
    setCartItems({});
    setSelectedItems([]);
  };

  const contextValue = {
    productList,
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
