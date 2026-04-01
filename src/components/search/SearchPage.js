import React, { useMemo, useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import ProductCard from "../common/ProductCard";
import productsData from "../../data/products";
import "../../styles/SearchPage.css";


/* All products */
const ALL_PRODUCTS = productsData;

/* Derived filter options from data */
const ALL_CATEGORIES = [...new Set(ALL_PRODUCTS.map((p) => p.category))];
const ALL_BRANDS = [...new Set(ALL_PRODUCTS.map((p) => p.brand))];

const SORT_OPTIONS = [
  { value: "relevance", label: "Em Destaque" },
  { value: "price-asc", label: "Menor Preço" },
  { value: "price-desc", label: "Maior Preço" },
  { value: "rating-desc", label: "Avaliação" },
];

function applyFilters(products, { query, categories, brands, minRating, maxPrice, sortBy }) {
  let result = [...products];

  // Text search
  if (query) {
    const q = query.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.brand && p.brand.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q))
    );
  }

  // Category filter
  if (categories.length > 0) {
    result = result.filter((p) => categories.includes(p.category));
  }

  // Brand filter
  if (brands.length > 0) {
    result = result.filter((p) => brands.includes(p.brand));
  }

  // Min rating
  if (minRating > 0) {
    result = result.filter((p) => p.rating >= minRating);
  }

  // Max price
  if (maxPrice) {
    result = result.filter((p) => parseFloat(p.price) <= parseFloat(maxPrice));
  }

  // Sort
  switch (sortBy) {
    case "price-asc":
      result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      break;
    case "price-desc":
      result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      break;
    case "rating-desc":
      result.sort((a, b) => b.rating - a.rating);
      break;
    default:
      break;
  }

  return result;
}

function CheckGroup({ title, options, selected, onChange }) {
  return (
    <div className="plp__filter-group">
      <h3 className="plp__filter-title">{title}</h3>
      <ul className="plp__filter-list">
        {options.map((opt) => {
          const checked = selected.includes(opt);
          return (
            <li key={opt} className="plp__filter-item">
              <label className="plp__filter-label">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onChange(opt)}
                  className="plp__filter-checkbox"
                />
                {opt}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Reset filters when query changes
  useEffect(() => {
    setCategories([]);
    setBrands([]);
    setMinRating(0);
    setMaxPrice("");
    setSortBy("relevance");
  }, [query]);

  const toggleCheckbox = (setter, list, value) => {
    setter(
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
    );
  };

  const filtered = useMemo(
    () => applyFilters(ALL_PRODUCTS, { query, categories, brands, minRating, maxPrice, sortBy }),
    [query, categories, brands, minRating, maxPrice, sortBy]
  );

  const clearAll = () => {
    setCategories([]);
    setBrands([]);
    setMinRating(0);
    setMaxPrice("");
    setSortBy("relevance");
  };

  return (
    <div className="plp">
      {/* ── Mobile filter toggle ── */}
      <button
        className="plp__filter-toggle"
        onClick={() => setSidebarOpen((v) => !v)}
        aria-expanded={sidebarOpen}
        id="plp-filter-toggle"
      >
        {sidebarOpen ? "✕ Fechar Filtros" : "☰ Filtros"}
      </button>

      <div className="plp__layout">
        {/* ── Sidebar ── */}
        <aside className={`plp__sidebar ${sidebarOpen ? "plp__sidebar--open" : ""}`} aria-label="Filtros de busca">
          <div className="plp__sidebar-header">
            <span className="plp__sidebar-title">Filtros</span>
            <button className="plp__clear-btn" onClick={clearAll} id="plp-clear-filters">
              Limpar tudo
            </button>
          </div>

          {/* Delivery */}
          <div className="plp__filter-group">
            <h3 className="plp__filter-title">Data de Entrega</h3>
            <ul className="plp__filter-list">
              <li className="plp__filter-item">
                <label className="plp__filter-label">
                  <input type="checkbox" className="plp__filter-checkbox" /> Receba Até Amanhã
                </label>
              </li>
              <li className="plp__filter-item">
                <label className="plp__filter-label">
                  <input type="checkbox" className="plp__filter-checkbox" /> Frete Grátis
                </label>
              </li>
            </ul>
          </div>

          {/* Rating */}
          <div className="plp__filter-group">
            <h3 className="plp__filter-title">Avaliação dos Clientes</h3>
            <ul className="plp__filter-list">
              {[4, 3, 2, 1].map((r) => (
                <li key={r} className="plp__filter-item">
                  <label className="plp__filter-label plp__filter-label--stars">
                    <input
                      type="radio"
                      name="rating"
                      checked={minRating === r}
                      onChange={() => setMinRating(minRating === r ? 0 : r)}
                      className="plp__filter-checkbox"
                    />
                    <span className="plp__stars-preview">
                      {"★".repeat(r)}{"☆".repeat(5 - r)}
                    </span>
                    <span>&amp; acima</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Brand */}
          <CheckGroup
            title="Marcas"
            options={ALL_BRANDS}
            selected={brands}
            onChange={(v) => toggleCheckbox(setBrands, brands, v)}
          />

          {/* Category */}
          <CheckGroup
            title="Categorias"
            options={ALL_CATEGORIES}
            selected={categories}
            onChange={(v) => toggleCheckbox(setCategories, categories, v)}
          />

          {/* Price */}
          <div className="plp__filter-group">
            <h3 className="plp__filter-title">Preço (máx. $)</h3>
            <div className="plp__price-inputs">
              <input
                type="number"
                min="0"
                placeholder="Ex: 500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="plp__price-input"
                id="plp-max-price"
              />
            </div>
            <ul className="plp__filter-list" style={{ marginTop: "0.5rem" }}>
              {[350, 700, 1000].map((p) => (
                <li key={p} className="plp__filter-item">
                  <button
                    className={`plp__price-preset ${maxPrice === p ? "active" : ""}`}
                    onClick={() => setMaxPrice(maxPrice === p ? "" : String(p))}
                  >
                    Até ${p}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* ── Main content ── */}
        <main className="plp__main">
          {/* Results header */}
          <div className="plp__results-header">
            <p className="plp__results-count">
              {filtered.length > 0 ? (
                <>
                  <span className="plp__results-count-num">{filtered.length}</span> resultado
                  {filtered.length !== 1 ? "s" : ""} para{" "}
                  {query && <strong>"{query}"</strong>}
                  {!query && <strong>todos os produtos</strong>}
                </>
              ) : (
                <>Nenhum resultado encontrado</>
              )}
            </p>
            <div className="plp__sort">
              <label htmlFor="plp-sort" className="plp__sort-label">
                Classificar por:
              </label>
              <select
                id="plp-sort"
                className="plp__sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active filter chips */}
          {(categories.length > 0 || brands.length > 0 || minRating > 0 || maxPrice) && (
            <div className="plp__chips">
              {categories.map((c) => (
                <button
                  key={c}
                  className="plp__chip"
                  onClick={() => toggleCheckbox(setCategories, categories, c)}
                >
                  {c} ✕
                </button>
              ))}
              {brands.map((b) => (
                <button
                  key={b}
                  className="plp__chip"
                  onClick={() => toggleCheckbox(setBrands, brands, b)}
                >
                  {b} ✕
                </button>
              ))}
              {minRating > 0 && (
                <button className="plp__chip" onClick={() => setMinRating(0)}>
                  {"★".repeat(minRating)} &amp; acima ✕
                </button>
              )}
              {maxPrice && (
                <button className="plp__chip" onClick={() => setMaxPrice("")}>
                  Até ${maxPrice} ✕
                </button>
              )}
            </div>
          )}

          {/* Product grid */}
          {filtered.length > 0 ? (
            <div className="plp__grid">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="plp__empty">
              <p className="plp__empty-icon">🔍</p>
              <p className="plp__empty-msg">
                Nenhum produto encontrado{query ? ` para "${query}"` : ""}.
              </p>
              <button className="plp__empty-clear" onClick={clearAll}>
                Limpar filtros
              </button>
              <Link to="/" className="plp__empty-link">
                ← Voltar para a loja
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
