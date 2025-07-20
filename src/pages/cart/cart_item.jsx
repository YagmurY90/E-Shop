import React, { useContext } from "react";
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
  } = useContext(ShopContext);

  return (
    <div className="cartItem">
      <img src={productImage} />
      
      <div className="description">
        <p><b>{productName}</b></p>
        <p>Price: ${price}</p>
        <div className="countHandler">
          <button onClick={() => removeFromCart(id)}> - </button>
          <input
            value={cartItems[id]}
            onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
          />
          <button onClick={() => addToCart(id)}> + </button>
        </div>
      </div>

      <div className="actions">
        <input
          type="checkbox"
          checked={selectedItems.includes(id)}
          onChange={() => toggleSelectItem(id)}
          title="Bu ürünü seç"
        />
        <button
          className="delete-btn"
          onClick={() => removeItemFromCart(id)}
          title="Ürünü sepetten kaldır"
        >
          <Trash size={20} />
        </button>
      </div>
    </div>
  );
};
