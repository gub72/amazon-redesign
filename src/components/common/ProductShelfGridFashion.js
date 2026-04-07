import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import "../../styles/ProductShelfGridFashion.css";

/**
 * ProductShelfGridFashion — A specialty shelf for Moda:
 *   - Header
 *   - Row 1 (6 products)
 *   - Two banners side-by-side
 *   - Row 2 (6 products)
 */
function ProductShelfGridFashion({ title, products, linkTo, banners }) {
  if (!products || products.length === 0) return null;

  // 6 products for top, rest for bottom (up to 12 total)
  const topProducts = products.slice(0, 6);
  const bottomProducts = products.slice(6, 12);

  return (
    <section className="shelf-fashion">
      {/* Header */}
      <div className="shelf-fashion__header">
        <h2 className="shelf-fashion__title">{title}</h2>
        {linkTo && (
          <Link to={linkTo} className="shelf-fashion__see-all">
            Confira mais →
          </Link>
        )}
      </div>

      {/* Row 1 */}
      <div className="shelf-fashion__grid">
        {topProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Banners */}
      {banners && banners.length >= 2 && (
        <div className="shelf-fashion__banners-row">
          <div className="shelf-fashion__banner-item">
            <img
              src={banners[0]}
              alt="Banner Moda 1"
              className="shelf-fashion__banner-img"
            />
          </div>
          <div className="shelf-fashion__banner-item">
            <img
              src={banners[1]}
              alt="Banner Moda 2"
              className="shelf-fashion__banner-img"
            />
          </div>
        </div>
      )}

      {/* Row 2 */}
      <div className="shelf-fashion__grid">
        {bottomProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductShelfGridFashion;
