import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import AnimateIn from "../components/AnimateIn";

const OrderSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const order = state || {};

  const goToMerch = () => {
    navigate("/");
    setTimeout(() => document.getElementById("merch")?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  return (
    <>
      <Helmet>
        <title>¡Gracias por tu compra! | Danger AK</title>
      </Helmet>
      <div className="relative pt-24 pb-16 px-4 sm:px-6 z-10 bg-black/85 backdrop-blur-sm">
        <AnimateIn>
        <div className="max-w-lg mx-auto text-center flex flex-col items-center justify-center min-h-[50vh]">
          <div className="w-20 h-20 rounded-full bg-red-600/20 flex items-center justify-center mx-auto mb-8">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl text-white mb-4 tracking-wider">
            ¡Pago exitoso!
          </h1>
          <p className="font-body text-gray-400 mb-8">
            Hemos recibido tu pedido. Se enviará un correo a{" "}
            <strong className="text-white">{order.email || "tu correo"}</strong>{" "}
            con los pormenores de tu compra.
          </p>
          {order.items?.length > 0 && (
            <div className="text-left bg-white/5 border border-white/10 p-6 mb-8">
              <h2 className="font-body font-medium text-white mb-4">
                Resumen del pedido
              </h2>
              <ul className="space-y-2 font-body text-gray-400 text-sm">
                {order.items.map((item, i) => (
                  <li key={i}>
                    {item.name} · Talla {item.size} · {item.qty} × ${item.price} MXN
                  </li>
                ))}
              </ul>
              <p className="font-body text-red-500 font-medium mt-4 pt-4 border-t border-white/10">
                Total: ${order.total} MXN
              </p>
            </div>
          )}
          <button
            type="button"
            onClick={goToMerch}
            className="inline-block px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white font-body font-medium btn-hover
              hover:bg-white hover:text-black transition-colors"
          >
            Seguir comprando
          </button>
        </div>
        </AnimateIn>
      </div>
    </>
  );
};

export default OrderSuccess;
