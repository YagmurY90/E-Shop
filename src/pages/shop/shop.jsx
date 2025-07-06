import React from "react";
import { PRODUCTS } from "../../products"; // ürünleri aldık
import { Product } from "./product"; // bileşeni aldık

export const Shop = () => {
  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>Douby Shop</h1>
      </div>

      <div className="products">
        {PRODUCTS.map((product) => (
          <Product key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};
