import React, { useContext } from "react";
import { ShopContext } from "../../context/shop_context";
import { PRODUCTS } from "../../products";
import { CartItem } from "./cart_item";
import "./cart.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Cart = () => {
  const { t, i18n } = useTranslation();
  const { cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
  const navigate = useNavigate();

  // 💰 Total hesapla
  const rawTotal = getTotalCartAmount();

  // 🧠 Formatlı hali
  const formattedTotal = new Intl.NumberFormat(i18n.language === "tr" ? "tr-TR" : "en-US", {
    style: "currency",
    currency: i18n.language === "tr" ? "TRY" : "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(rawTotal);

  return (
    <div className="cart">
      <div>
        <h1>{t("Your Cart Items")}</h1>
      </div>
      <div className="cart">
        {PRODUCTS.map((product) => {
          if (cartItems[product.id] !== 0) {
            return <CartItem key={product.id} data={product} />;
          }
          return null;
        })}
      </div>
      {rawTotal > 0 ? (
        <div className="checkout">
         <p>
          <strong>{t("subtotal")}:</strong> {formattedTotal}
         </p>

          <button onClick={() => navigate("/")}>
            {t("Continue Shopping")}
          </button>
          <button
            onClick={() => {
              checkout();
              navigate("/checkout");
            }}
          >
            {t("Checkout")}
          </button>
        </div>
      ) : (
        <h1>{t("Your Shopping Cart is Empty")}</h1>
      )}
    </div>
  );
};
