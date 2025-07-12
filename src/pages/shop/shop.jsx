import React from "react";
import { PRODUCTS } from "../../products";
import { Product } from "./product";
import "./shop.css";
import { useTranslation } from "react-i18next"; // 🧠 i18n hook

export const Shop = () => {
  const { t } = useTranslation(); // çeviri kankası

  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>{t("Douby Shop")}</h1>
      </div>

      <div className="products">
        {PRODUCTS.map((product) => (
          <Product key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};
