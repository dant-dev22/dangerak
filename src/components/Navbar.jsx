import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const SECTIONS = [
  { id: "musica", label: "Música" },
  { id: "merch", label: "Merch" },
  { id: "tour", label: "Tour" },
  { id: "contacto", label: "Contacto" },
];

const scrollToSection = (id, navigate, onClose) => {
  onClose?.();
  if (window.location.pathname !== "/") {
    navigate("/");
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }
};

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const { itemCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 animate-navbar-enter backdrop-blur-md"
      role="navigation"
      aria-label="Navegación principal"
      style={{ backgroundColor: "rgba(26, 5, 5, 0.92)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            setMobileOpen(false);
            isHome ? document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" }) : navigate("/");
          }}
          className="font-heading text-xl sm:text-2xl md:text-3xl text-white hover:text-red-500 transition-colors"
        >
          DANGER AK
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-10">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => scrollToSection(s.id, navigate)}
                className="font-body text-sm lg:text-base font-medium text-white hover:text-red-400 transition-colors"
              >
                {s.label}
              </button>
            </li>
          ))}
          <li>
            <Link
              to="/carrito"
              className="relative flex items-center justify-center w-10 h-10 text-white hover:text-red-500 transition-colors"
              aria-label={`Carrito con ${itemCount} artículos`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-red-600 text-white text-xs font-body font-medium flex items-center justify-center">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>
          </li>
        </ul>

        {/* Mobile: cart + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            to="/carrito"
            className="relative flex items-center justify-center w-9 h-9 text-white"
            aria-label={`Carrito: ${itemCount} artículos`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] rounded-full bg-red-600 text-white text-[10px] font-body font-medium flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="w-9 h-9 flex flex-col justify-center gap-1.5 text-white"
            aria-expanded={mobileOpen}
            aria-label="Menú"
          >
            <span className={`block w-5 h-0.5 bg-current transition-transform ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-current ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-current transition-transform ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0a0202]/98">
          <ul className="px-4 py-4 space-y-1">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => scrollToSection(s.id, navigate, () => setMobileOpen(false))}
                  className="w-full text-left px-4 py-3 font-body text-white hover:bg-white/10 rounded"
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
