import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import { Navbar } from "./components/navbar";
import { Shop } from "./pages/shop/shop";
import { Cart } from "./pages/cart/cart";
import { Favorites } from "./pages/favorites/favorites";
import { ShopContextProvider, ShopContext } from "./context/shop_context";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { ProductDetailPanel } from "./components/ProductDetailPanel"; 


// ⚠️ Yeni wrapper komponent tanımlıyoruz çünkü context'i App bileşeni içinde kullanmak istiyoruz
function ThemedApp() {
  const { theme } = useContext(ShopContext);

  return (
    <div className={`App ${theme}`}>
      <Router>
        <Navbar />
        {/* 🆕 Ürün detay paneli */}
        <ProductDetailPanel />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
        <Toaster position="top-right" reverseOrder={false} />
      </Router>
    </div>
  );
}

function App() {
  return (
    <ShopContextProvider>
      <ThemedApp />
    </ShopContextProvider>
  );
}

export default App;
