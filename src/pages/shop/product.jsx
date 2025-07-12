import React, { useContext } from "react";
import { ShopContext } from "../../context/shop_context";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export const Product = (props) => {
  const { t, i18n } = useTranslation(); // i18n buradan alınmalı
  const { id, productName, price, productImage } = props.data;
  const { addToCart, cartItems, favorites, toggleFavorite } = useContext(ShopContext);

  const cartItemCount = cartItems[id];
  const isFavorited = favorites.includes(id);

  const handleFavorite = (e) => {
    e.stopPropagation();

    const isNowFav = !isFavorited;
    toggleFavorite(id);

    toast[isNowFav ? "success" : "error"](
      isNowFav ? t("favorite_added") + " 💖" : t("favorite_removed") + " 💔",
      {
        style: {
          borderRadius: "10px",
          background: isNowFav ? "#f0fff4" : "#fff0f0",
          color: isNowFav ? "#00875a" : "#b00020",
        },
      }
    );

    setTimeout(() => {
      const heart = document.createElement("div");
      heart.className = "flying-heart";
      heart.innerText = "💖";
      const rect = e.target.getBoundingClientRect();
      heart.style.left = `${rect.left}px`;
      heart.style.top = `${rect.top + window.scrollY}px`;
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 1000);
    }, 0);
  };

  const formattedPrice = new Intl.NumberFormat(i18n.language === "tr" ? "tr-TR" : "en-US", {
    style: "currency",
    currency: i18n.language === "tr" ? "TRY" : "USD",
  }).format(price);

  return (
    <div className="product">
      <div className="heart-icon" onClick={handleFavorite}>
        {isFavorited ? "❤️" : "🤍"}
      </div>
      <img src={productImage} alt={productName} />
      <div className="description">
        <p><b>{productName}</b></p>
        <p>{formattedPrice}</p>
      </div>
      <button className="addToCartBttn" onClick={() => addToCart(id)}>
        {t("add_to_cart")} {cartItemCount > 0 && <> ({cartItemCount})</>}
      </button>
    </div>
  );
};
