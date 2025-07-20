import React, { useContext } from "react";
import toast from "react-hot-toast";
import { ShopContext } from "../../context/shop_context";
import { PRODUCTS } from "../../products";
import { CartItem } from "./cart_item";
import "./cart.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Cart = () => {
  const { t, i18n } = useTranslation();
  const {
    cartItems,
    getTotalCartAmount,
    getSelectedTotalAmount,
    selectedItems,
    checkout,
  } = useContext(ShopContext);

  const navigate = useNavigate();

  // 💰 Total hesapla
  const rawTotal = getTotalCartAmount();
  const selectedTotal = getSelectedTotalAmount();

  // 💸 Formatlı fiyat
  const formatter = new Intl.NumberFormat(
    i18n.language === "tr" ? "tr-TR" : "en-US",
    {
      style: "currency",
      currency: i18n.language === "tr" ? "TRY" : "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  );
  const formattedTotal = formatter.format(rawTotal);
  const formattedSelectedTotal = formatter.format(selectedTotal);

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      toast.error("⚠️ Lütfen en az 1 ürün seçin!");
      return;
    }

    const selectedNames = PRODUCTS
      .filter((p) => selectedItems.includes(p.id))
      .map((p) => `${p.productName} x${cartItems[p.id]}`)
      .join(", ");

    toast.success(`🛍️ Satın Alındı: ${selectedNames}`, {
      duration: 5000,
      style: {
        background: "#333",
        color: "#fff",
        borderRadius: "10px",
      },
    });

    checkout();
    navigate("/checkout");
  };

  return (
    <div className="cart-page">
      <h1>{t("Your Cart Items")}</h1>

      <div className="cart-items">
        {PRODUCTS.map((product) =>
          cartItems[product.id] > 0 ? (
            <CartItem key={product.id} data={product} />
          ) : null
        )}
      </div>

      {rawTotal > 0 ? (
        <div className="checkout">
          <p>
            <strong>{t("subtotal")}:</strong> {formattedTotal}
          </p>
          {selectedItems.length > 0 && (
            <p>
              <strong>
                ✔️ {t("selected_total") || "Seçilenlerin Toplamı"}:
              </strong>{" "}
              {formattedSelectedTotal}
            </p>
          )}
          <button onClick={() => navigate("/")}>
            {t("Continue Shopping")}
          </button>
          <button onClick={handleCheckout}>{t("Checkout")}</button>
        </div>
      ) : (
        <h1>{t("Your Shopping Cart is Empty")}</h1>
      )}
    </div>
  );
};
