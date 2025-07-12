import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Moon, Sun } from "phosphor-react";
import { ShopContext } from "../context/shop_context";
import { useTranslation } from "react-i18next";
import "./navbar.css";

export const Navbar = () => {
  const { cartItems, favorites, theme, toggleTheme } = useContext(ShopContext);
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const totalCartCount = Object.values(cartItems).reduce((a, b) => a + b, 0);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">Douby</Link>
      </div>

      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>{t("shop")}</Link>
        <Link to="/favorites" onClick={() => setMenuOpen(false)}>
          ❤️ {favorites.length > 0 && <span className="badge">{favorites.length}</span>}
        </Link>
        <Link to="/cart" onClick={() => setMenuOpen(false)}>
          <ShoppingCart size={22} />
          {totalCartCount > 0 && <span className="badge">{totalCartCount}</span>}
        </Link>

        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? <Moon size={22} /> : <Sun size={22} />}
        </button>

        <div className="lang-switch">
          <img
            src="/flags/trr.png"
            alt="Türkçe"
            className="flag"
            onClick={() => changeLanguage("tr")}
          />
          <img
            src="/flags/engg.png"
            alt="English"
            className="flag"
            onClick={() => changeLanguage("en")}
          />
        </div>
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>
    </div>
  );
};
