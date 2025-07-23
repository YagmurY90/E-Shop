import React,{ useEffect, useState }from "react";
import { PRODUCTS } from "../../products";
import { Product } from "./product";
import "./shop.css";
import { useTranslation } from "react-i18next"; // 🧠 i18n hook

export const Shop = () => {
  const { t } = useTranslation(); 
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=24")
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.products.map((p) => ({
          id: p.id,
          productName: p.title,
          price: p.price,
          productImage: p.thumbnail,
          description: p.description,
        }));
        setProducts(mapped);
      })
      .catch((err) => {
        console.error("Ürünler yüklenemedi ❌", err);
      });
  }, []);

  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>{t("Douby Shop")}</h1>
      </div>

         <div className="products">
        {products.length === 0 ? (
          <p>{t("loading") || "Yükleniyor..."}</p>
        ) : (
          products.map((product) => (
            <Product key={product.id} data={product} />
          ))
        )}
      </div>
    </div>
  );
};
