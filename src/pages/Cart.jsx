import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useCart } from "../context/CartContext";
import AnimateIn from "../components/AnimateIn";

const Cart = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, total } = useCart();

  const goToMerch = () => {
    navigate("/");
    setTimeout(() => document.getElementById("merch")?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  if (items.length === 0) {
    return (
      <>
        <Helmet>
          <title>Carrito | Danger AK</title>
        </Helmet>
        <div className="relative pt-24 pb-16 px-4 sm:px-6 z-10 bg-black/85 backdrop-blur-sm">
          <AnimateIn>
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
              <h1 className="font-heading text-2xl sm:text-3xl text-white mb-4 text-center">Tu carrito está vacío</h1>
              <button
                type="button"
                onClick={goToMerch}
                className="text-red-500 hover:text-red-400 font-body font-medium btn-hover"
              >
                Ir a la tienda
              </button>
            </div>
          </AnimateIn>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Carrito | Danger AK</title>
      </Helmet>
      <div className="relative pt-24 pb-16 px-4 sm:px-6 z-10 bg-black/85 backdrop-blur-sm">
        <AnimateIn>
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-4xl text-white mb-12 tracking-wider">
            Carrito
          </h1>

          <ul className="space-y-6 mb-12">
            {items.map((item) => (
              <li
                key={`${item.productId}-${item.size}`}
                className="flex gap-6 p-4 border border-white/10"
              >
                <div className="w-24 h-24 bg-white/5 flex-shrink-0 overflow-hidden">
                  <img
                    src={item.product.images?.[0] || "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80"}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-body font-medium text-white">
                    {item.product.name}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Talla: {item.size} · ${item.product.price} MXN
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.productId, item.size, item.quantity - 1)
                      }
                      className="w-8 h-8 border border-white/20 text-white hover:bg-white/10"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-body text-white">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.productId, item.size, item.quantity + 1)
                      }
                      className="w-8 h-8 border border-white/20 text-white hover:bg-white/10"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-body text-red-500 font-medium">
                    ${item.product.price * item.quantity} MXN
                  </p>
                  <button
                    type="button"
                    onClick={() => removeItem(item.productId, item.size)}
                    className="text-gray-400 hover:text-red-500 text-sm mt-2"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="border-t border-white/10 pt-6 flex justify-between items-center">
            <span className="font-body text-white font-medium">Total</span>
            <span className="font-heading text-2xl text-red-500">${total} MXN</span>
          </div>

          <Link
            to="/checkout"
            className="block w-full mt-8 px-8 py-4 bg-white text-black font-body font-medium text-center btn-hover
              hover:bg-red-600 hover:text-white transition-colors"
          >
            Proceder al pago
          </Link>
        </div>
        </AnimateIn>
      </div>
    </>
  );
};

export default Cart;
