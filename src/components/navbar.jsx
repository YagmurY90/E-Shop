import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import { ShopContext } from "../context/shop_context";
import "./navbar.css";

export const Navbar = () => {
  const { cartItems, favorites } = useContext(ShopContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const totalCartCount = Object.values(cartItems).reduce((a, b) => a + b, 0);

  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">Douby</Link>
      </div>

      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Shop</Link>
        <Link to="/favorites" onClick={() => setMenuOpen(false)}>
          ❤️ {favorites.length > 0 && <span className="badge">{favorites.length}</span>}
        </Link>
        <Link to="/cart" onClick={() => setMenuOpen(false)}>
          <ShoppingCart size={22} />
          {totalCartCount > 0 && <span className="badge">{totalCartCount}</span>}
        </Link>
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>
    </div>
  );
};
