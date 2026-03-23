import { useState, useEffect } from "react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

export default function ProductCarousel({ title = "Merch seleccionado", showViewMore = true, onViewMore, onProductClick }) {
  const { addItem } = useCart();
  const featured = products.filter((p) => p.featured);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % featured.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [featured.length]);

  if (featured.length === 0) return null;

  const product = featured[activeIndex];
  const img = product.images?.[0] || "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80";
  const defaultSize = product.sizes?.[0] || "Única";

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;
    addItem(product.id, defaultSize, 1);
  };

  const handleProductClick = (e) => {
    e.preventDefault();
    if (onProductClick) onProductClick(product.id);
  };

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6">
      <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-white mb-8 sm:mb-10 tracking-wider text-center">
        {title}
      </h2>
      <div className="max-w-md mx-auto w-full">
        <div className="relative">
          <button
            type="button"
            onClick={() => setActiveIndex((i) => (i - 1 + featured.length) % featured.length)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 md:-translate-x-8 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-white/20 text-white btn-hover flex items-center justify-center"
            aria-label="Producto anterior"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="bg-white/5 border border-white/10 p-4 sm:p-6 flex flex-col">
            <button
              type="button"
              onClick={handleProductClick}
              className="block text-left group focus:outline-none focus:ring-2 focus:ring-red-500 rounded overflow-hidden"
              aria-label={`Ver producto: ${product.name}`}
            >
              <div className="aspect-square bg-white/5 mb-3 sm:mb-4 overflow-hidden">
                <img src={img} alt={product.name} className="w-full h-full object-cover group-hover:opacity-90 transition-opacity" />
              </div>
              <h3 className="font-heading text-xl sm:text-2xl text-white mb-1 sm:mb-2 group-hover:text-red-500 transition-colors">
                {product.name}
              </h3>
              <p className="font-body text-red-500 font-medium mb-4 sm:mb-6">${product.price} MXN</p>
            </button>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-black font-body font-medium text-center btn-hover text-sm sm:text-base
                hover:bg-red-600 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {product.inStock ? "Agregar al carrito" : "Agotado"}
            </button>
          </div>

          <button
            type="button"
            onClick={() => setActiveIndex((i) => (i + 1) % featured.length)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 md:translate-x-8 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-white/20 text-white btn-hover flex items-center justify-center"
            aria-label="Siguiente producto"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-4 sm:mt-6">
          {featured.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-colors ${
                idx === activeIndex ? "bg-red-600 scale-125" : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Ir al producto ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {showViewMore && (
        <div className="text-center mt-8 sm:mt-10">
          <button
            type="button"
            onClick={onViewMore}
            className="inline-block px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white font-body font-medium btn-hover text-sm sm:text-base
              hover:bg-white hover:text-black transition-all duration-300"
          >
            Ver más
          </button>
        </div>
      )}
    </div>
  );
}
