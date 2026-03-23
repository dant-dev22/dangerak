import { useInView } from "../hooks/useInView";

/**
 * Wrapper que anima el contenido cuando entra en el viewport
 * (por scroll o al navegar por hash).
 */
export default function AnimateIn({ children, className = "", delay = 0 }) {
  const [ref, isInView] = useInView();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isInView ? "animate-in-visible" : "animate-in-hidden"
      } ${className}`}
      style={{ transitionDelay: isInView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
