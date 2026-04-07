import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import "../../styles/ProductShelfGrid.css";

/**
 * ProductShelfGrid — A special shelf layout for "Eletrônicos".
 *
 * Desktop: grid with 5 columns.
 *   - Full-width banner at top
 *   - 5 products
 *   - 3 side-by-side banners
 *   - remaining products in rows of 5
 *
 * Mobile: 2-column grid.
 *   - Full-width banner at top
 *   - Products in 2-col grid
 *   - Banners shown as a carousel (dots, no arrows)
 *   - Rest of products in 2-col grid
 */

const SHELF_BANNERS = {
  main: "/assets/shelfBanner/shelfBanner_1.png",
  secondary: [
    "/assets/shelfBanner/shelfBanner_A1.png",
    "/assets/shelfBanner/shelfBanner_A2.png",
    "/assets/shelfBanner/shelfBanner_A3.png",
  ],
};

function BannerCarousel({ banners }) {
  const [active, setActive] = useState(0);
  const intervalRef = useRef(null);
  const touchStartX = useRef(0);

  const startAutoplay = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % banners.length);
    }, 4000);
  }, [banners.length]);

  useEffect(() => {
    startAutoplay();
    return () => clearInterval(intervalRef.current);
  }, [startAutoplay]);

  const goTo = (index) => {
    setActive(index);
    startAutoplay();
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        goTo((active + 1) % banners.length);
      } else {
        goTo((active - 1 + banners.length) % banners.length);
      }
    }
  };

  return (
    <div
      className="shelf-grid__banner-carousel"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="shelf-grid__carousel-track">
        {banners.map((src, i) => (
          <div
            key={i}
            className={`shelf-grid__carousel-slide ${i === active ? "shelf-grid__carousel-slide--active" : ""
              }`}
          >
            <img
              src={src}
              alt={`Banner promocional ${i + 1}`}
              className="shelf-grid__banner-img"
              loading="lazy"
            />
          </div>
        ))}
      </div>
      <div className="shelf-grid__carousel-dots">
        {banners.map((_, i) => (
          <button
            key={i}
            className={`shelf-grid__dot ${i === active ? "shelf-grid__dot--active" : ""
              }`}
            onClick={() => goTo(i)}
            aria-label={`Ir para banner ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function ProductShelfGrid({ title, products, linkTo }) {
  if (!products || products.length === 0) return null;

  // Split products: first 5, then remaining
  const firstRow = products.slice(0, 6);
  const remainingProducts = products.slice(6);

  return (
    <section className="shelf-grid-eletronicos-container">
      <div className="shelf-grid" id="shelf-grid-eletronicos">
        {/* Header */}
        <div className="shelf-grid__header">
          <h2 className="shelf-grid__title">Ofertas especiais em Periféricos</h2>
          {linkTo && (
            <Link to={linkTo} className="shelf-grid__see-all">
              Confira mais →
            </Link>
          )}
        </div>

        {/* ═══════════════ DESKTOP LAYOUT ═══════════════ */}
        <div className="shelf-grid__desktop">
          {/* Banner 1 — full width */}
          <div className="shelf-grid__banner-full">
            <img
              src={SHELF_BANNERS.main}
              alt="Banner promocional principal"
              className="shelf-grid__banner-img"
            />
          </div>

          {/* First row of products */}
          <div className="shelf-grid__products-row">
            {firstRow.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* 3 banners side-by-side */}
          <div className="shelf-grid__banners-row">
            {SHELF_BANNERS.secondary.map((src, i) => (
              <div key={i} className="shelf-grid__banner-item">
                <img
                  src={src}
                  alt={`Banner promocional ${i + 1}`}
                  className="shelf-grid__banner-img"
                />
              </div>
            ))}
          </div>

          {/* Remaining products in rows of 5 */}
          <div className="shelf-grid__products-row">
            {remainingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* ═══════════════ MOBILE LAYOUT ═══════════════ */}
        <div className="shelf-grid__mobile">
          {/* Banner 1 — full width */}
          <div className="shelf-grid__banner-full">
            <img
              src={SHELF_BANNERS.main}
              alt="Banner promocional principal"
              className="shelf-grid__banner-img"
            />
          </div>

          {/* First row of products (2 cols) */}
          <div className="shelf-grid__products-grid-mobile">
            {firstRow.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Banner carousel — swipe, dots, no arrows */}
          <BannerCarousel banners={SHELF_BANNERS.secondary} />

          {/* Remaining products (2 cols) */}
          <div className="shelf-grid__products-grid-mobile">
            {remainingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductShelfGrid;
