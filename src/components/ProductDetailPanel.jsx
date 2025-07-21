import React, { useContext } from "react";
import { ShopContext } from "../context/shop_context";
import "./ProductDetail.css";
import { useTranslation } from "react-i18next";

export const ProductDetailPanel = () => {
  const { selectedProduct, setSelectedProduct } = useContext(ShopContext);
  const { t } = useTranslation();

  if (!selectedProduct) return null;

  return (
    <div className="detail-panel">
      <button className="close-btn" onClick={() => setSelectedProduct(null)}>✖</button>
      <img src={selectedProduct.productImage} alt={selectedProduct.productName} />
      <h2>{selectedProduct.productName}</h2>
      <p>{selectedProduct.description || t("no_product_detail")}</p>
      <p><strong>{t("price")}:</strong> ${selectedProduct.price}</p>
    </div>
  );
};
