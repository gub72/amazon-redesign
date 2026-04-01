import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ROUTE_TITLES = {
  "/": "Página inicial — Amazon Redesign",
  "/checkout": "Carrinho de compras",
  "/payment": "Pagamento",
  "/orders": "Seus pedidos",
  "/login": "Login",
  "/signup": "Criar conta",
  "/search": "Resultados de busca",
};

export default function RouteAnnouncer() {
  const location = useLocation();
  const ref = useRef(null);

  useEffect(() => {
    const base = location.pathname.replace(/\/product\/.*/, "/product");
    const title =
      ROUTE_TITLES[location.pathname] ||
      (base === "/product" ? "Página do produto" : "Amazon Redesign");

    document.title = title;

    if (ref.current) {
      ref.current.textContent = `Navegou para: ${title}`;
    }
  }, [location]);

  return (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="visually-hidden"
    />
  );
}
