import { useState } from "react";
import AnimateIn from "./AnimateIn";
import ProductCarousel from "./ProductCarousel";
import TiendaCatalog from "./TiendaCatalog";
import ProductModal from "./ProductModal";

export default function MerchSection() {
  const [showTienda, setShowTienda] = useState(false);
  const [modalProductId, setModalProductId] = useState(null);

  return (
    <section
      id="merch"
      className="relative py-16 sm:py-24 px-4 sm:px-6 z-10 bg-black/85 backdrop-blur-sm min-h-screen flex flex-col"
      aria-labelledby="merch-title"
    >
      <AnimateIn>
        <ProductCarousel
          title="Merch seleccionado"
          showViewMore
          onViewMore={() => {
            setShowTienda(true);
            setTimeout(() => {
              document.getElementById("tienda-catalog")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 100);
          }}
          onProductClick={setModalProductId}
        />
      </AnimateIn>

      {showTienda && (
        <div id="tienda-catalog" className="mt-8 sm:mt-12">
          <AnimateIn>
            <div className="max-w-7xl mx-auto">
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-white mb-6 sm:mb-8 tracking-wider">
                Tienda
              </h2>
              <TiendaCatalog onProductClick={setModalProductId} />
            </div>
          </AnimateIn>
        </div>
      )}

      {modalProductId && (
        <ProductModal productId={modalProductId} onClose={() => setModalProductId(null)} />
      )}
    </section>
  );
}
