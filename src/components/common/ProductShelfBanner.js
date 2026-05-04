import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import "../../styles/ProductShelfBanner.css";

/**
 * ProductShelfBanner — A shelf layout with:
 *   - Header (title + "Confira mais" link)
 *   - Full-width banner image
 *   - Product grid with 6 products per row
 *
 * Props:
 *   title      — shelf heading
 *   products   — array of product objects
 *   linkTo     — optional "Ver tudo" link URL
 *   bannerSrc  — path to the banner image
 *   bannerAlt  — alt text for the banner
 */
function ProductShelfBanner({ title, products, linkTo, bannerSrc, bannerAlt }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="shelf-banner">
      {/* Header */}
      <div className="shelf-banner__header">
        <h2 className="shelf-banner__title">{title}</h2>
        {linkTo && (
          <Link to={linkTo} className="shelf-banner__see-all">
            Ver tudo →
          </Link>
        )}
      </div>

      {/* Banner */}
      {bannerSrc && (
        <div className="shelf-banner__image-wrap">
          <img
            src={bannerSrc}
            alt={bannerAlt || "Banner promocional"}
            className="shelf-banner__image"
          />
        </div>
      )}

      {/* Products Grid — 6 per row */}
      <div className="shelf-banner__grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductShelfBanner;
