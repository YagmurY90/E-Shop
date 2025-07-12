import React, { useContext } from "react";
import { ShopContext } from "../../context/shop_context";
import { PRODUCTS } from "../../products";
import { Product } from "../shop/product";

export const Favorites = () => {
  const { favorites } = useContext(ShopContext);
  const favoriteProducts = PRODUCTS.filter((p) =>
    favorites.includes(Number(p.id))
  );

  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>Favorilerim</h1>
      </div>
      <div className="products">
        {favoriteProducts.length > 0 ? (
          favoriteProducts.map((product) => (
            <Product key={product.id} data={product} />
          ))
        ) : (
          <p>Hiç favori ürününüz yok 😢</p>
        )}
      </div>
    </div>
  );
};
