import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import "../../styles/ProductShelf.css";

/* Custom arrow components for the shelf slider */
function ShelfPrevArrow({ onClick }) {
  return (
    <button className="shelf__arrow shelf__arrow--prev" onClick={onClick} aria-label="Previous">
      ‹
    </button>
  );
}

function ShelfNextArrow({ onClick }) {
  return (
    <button className="shelf__arrow shelf__arrow--next" onClick={onClick} aria-label="Next">
      ›
    </button>
  );
}

/**
 * ProductShelf — A category shelf that displays up to 5 products in a row.
 * When there are more than 5 products, it uses react-slick to slide.
 *
 * Props:
 *   title    — shelf heading, e.g. "Best Sellers em Eletrônicos"
 *   products — array of product objects
 *   linkTo   — optional "Ver tudo" link URL
 */
function ProductShelf({ title, products, linkTo }) {
  if (!products || products.length === 0) return null;

  const needsSlider = products.length > 6;

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 400,
    slidesToShow: 6,
    slidesToScroll: 3,
    prevArrow: <ShelfPrevArrow />,
    nextArrow: <ShelfNextArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 5, slidesToScroll: 2 },
      },
      {
        breakpoint: 992,
        settings: { slidesToShow: 4, slidesToScroll: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <section className="shelf">
      {/* Header */}
      <div className="shelf__header">
        <h2 className="shelf-banner__title">{title}</h2>
        {linkTo && (
          <Link to={linkTo} className="shelf__see-all">
            Confira mais →
          </Link>
        )}
      </div>

      {/* Desktop: slider (when >5) or grid (when ≤5) */}
      {needsSlider ? (
        <div className="shelf__slider shelf__desktop-only">
          <Slider {...sliderSettings}>
            {products.map((product) => (
              <div key={product.id} className="shelf__slide-item">
                <ProductCard product={product} />
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <div className="shelf__grid shelf__desktop-only">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Mobile: always 2-column grid, no slider */}
      <div className="shelf__grid shelf__mobile-only">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductShelf;
