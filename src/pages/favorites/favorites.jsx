import React, { useContext } from "react";
import { ShopContext } from "../../context/shop_context";
import { Product } from "../shop/product";
import { useTranslation } from "react-i18next";
import "./favorites.css";

export const Favorites = () => {
  const { favorites, productList } = useContext(ShopContext);
  const { t } = useTranslation();

  const favProducts = productList.filter((p) => favorites.includes(p.id));

  return (
    <div className="favorites">
      <div className="shopTitle">
        <h1>{t("favorites")}</h1>
      </div>

      <div className="products">
        {favProducts.length > 0 ? (
          favProducts.map((product) => (
            <Product key={product.id} data={product} />
          ))
        ) : (
          <p>{t("no_favorites") || "Henüz favori ürününüz yok 😢"}</p>
        )}
      </div>
    </div>
  );
};
