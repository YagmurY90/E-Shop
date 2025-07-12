import React, { useContext } from "react";
import { ShopContext } from "../../context/shop_context";
import toast from "react-hot-toast";

export const Product = (props) => {
  const { id, productName, price, productImage } = props.data;
  const { addToCart, cartItems, favorites, toggleFavorite } = useContext(ShopContext);

  const cartItemCount = cartItems[id];
  const isFavorited = favorites.includes(id);

  const handleFavorite = (e) => {
    e.stopPropagation();

    const isNowFav = !isFavorited;
    toggleFavorite(id);

    toast[isNowFav ? "success" : "error"](
      isNowFav ? "Favorilere eklendi 💖" : "Favorilerden çıkarıldı 💔",
      {
        style: {
          borderRadius: '10px',
          background: isNowFav ? '#f0fff4' : '#fff0f0',
          color: isNowFav ? '#00875a' : '#b00020',
        },
      }
    );

    // Kalp efekti
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

  return (
    <div className="product">
      <div className="heart-icon" onClick={handleFavorite}>
        {isFavorited ? "❤️" : "🤍"}
      </div>
      <img src={productImage} />
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p> ${price}</p>
      </div>
      <button className="addToCartBttn" onClick={() => addToCart(id)}>
        Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
      </button>
    </div>
  );
};
