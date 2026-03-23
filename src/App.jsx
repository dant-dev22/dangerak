import { useRef } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import ParallaxBackground from "./components/ParallaxBackground";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MusicaSection from "./components/MusicaSection";
import TourSection from "./components/TourSection";
import MerchSection from "./components/MerchSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";

function HomePage() {
  const tourRef = useRef(null);
  return (
    <main>
      <Hero />
      <MusicaSection />
      <TourSection sectionRef={tourRef} />
      <MerchSection />
      <ContactSection />
      <Footer />
    </main>
  );
}

function App() {
  return (
    <CartProvider>
      <ParallaxBackground />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/carrito" element={<><Cart /><Footer /></>} />
        <Route path="/checkout" element={<><Checkout /><Footer /></>} />
        <Route path="/orden-exitosa" element={<><OrderSuccess /><Footer /></>} />
      </Routes>
    </CartProvider>
  );
}

export default App;
