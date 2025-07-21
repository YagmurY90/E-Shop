import React, { useContext } from "react";
import toast from "react-hot-toast";
import { ShopContext } from "../../context/shop_context";
import { Trash } from "phosphor-react";

export const CartItem = (props) => {
  const { id, productName, price, productImage } = props.data;
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemCount,
    removeItemFromCart,
    selectedItems,
    toggleSelectItem,
    setSelectedProduct,
  } = useContext(ShopContext);

  return (
    <div className="cartItem" onClick={() => setSelectedProduct(props.data)}>
      <img src={productImage} />

      <div className="description">
        <p><b>{productName}</b></p>
        <p>Price: ${price}</p>
        <div className="countHandler">
          <button onClick={(e) => {
            e.stopPropagation();
            removeFromCart(id);
          }}> - </button>

          <input
            value={cartItems[id]}
            onChange={(e) => {
              e.stopPropagation();
              updateCartItemCount(Number(e.target.value), id);
            }}
            onClick={(e) => e.stopPropagation()}
          />

          <button onClick={(e) => {
            e.stopPropagation();
            addToCart(id);
          }}> + </button>
        </div>
      </div>

      <div className="actions" onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={selectedItems.includes(id)}
          onChange={() => toggleSelectItem(id)}
          title="Bu ürünü seç"
        />
        <button
  className="delete-btn"
  onClick={(e) => {
    e.stopPropagation();
    removeItemFromCart(id);
    toast.success("🗑️ Ürün sepetten silindi!", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  }}
  title="Ürünü sepetten kaldır"
>
  <Trash size={20} />
</button>

      </div>
    </div>
  );
};
