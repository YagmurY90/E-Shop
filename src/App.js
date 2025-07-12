
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Shop } from "./pages/shop/shop";
import { Cart } from "./pages/cart/cart";
import { ShopContextProvider } from "./context/shop_context";
import { Favorites } from "./pages/favorites/favorites";
import { Toaster } from 'react-hot-toast';



function App() {
  return (
    <div className="App">
      <ShopContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/favorites" element={<Favorites />} /> {/* 💥 Bu önemli */}
          </Routes>
        </Router>
        <Toaster position="top-right" reverseOrder={false} />
      </ShopContextProvider>
    </div>
  );
}

export default App;
