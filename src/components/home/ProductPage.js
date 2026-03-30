import React, { useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/features/cart/cartSlice";
import Star from "../common/Star";
import * as utils from "../../logic/utils";
import productsData from "../../data/products";
import "../../styles/ProductPage.css";

/* All products */
const allProducts = productsData;

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product = useMemo(
    () => allProducts.find((p) => p.id === id),
    [id]
  );

  if (!product) {
    return (
      <div className="pdp__not-found">
        <h2>Produto não encontrado.</h2>
        <Link to="/">← Voltar para a loja</Link>
      </div>
    );
  }

  const { name, image, price, rating, brand, category, description, features } = product;

  const handleAddToCart = () => {
    dispatch(addItem({ id, title: name, image, price, rating }));
    navigate("/checkout");
  };

  const handleBuyNow = () => {
    dispatch(addItem({ id, title: name, image, price, rating }));
    navigate("/payment");
  };

  return (
    <div className="pdp">
      {/* Breadcrumb */}
      <nav className="pdp__breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span aria-hidden="true"> › </span>
        <span>{category}</span>
        <span aria-hidden="true"> › </span>
        <span className="pdp__breadcrumb-current">{name}</span>
      </nav>

      {/* Main content */}
      <div className="pdp__main">
        {/* Left — image */}
        <div className="pdp__gallery">
          <div className="pdp__img-wrapper">
            <img src={image} alt={name} className="pdp__img" />
          </div>
        </div>

        {/* Center — details */}
        <div className="pdp__details">
          <p className="pdp__brand">{brand}</p>
          <h1 className="pdp__title">{name}</h1>

          {/* Rating */}
          <div className="pdp__rating-row">
            <div className="pdp__stars" aria-label={`Rating: ${rating} out of 5`}>
              {utils.renderRating(rating * 2).map((val, i) => (
                <Star key={i} text={val} />
              ))}
            </div>
            <span className="pdp__rating-count">{rating} out of 5</span>
          </div>

          <hr className="pdp__divider" />

          {/* Price */}
          <div className="pdp__price-block">
            <span className="pdp__price-label">Price:</span>
            <p className="pdp__price">
              <span className="pdp__price-sym">$</span>
              <span className="pdp__price-main">{utils.getPrice(price)}</span>
              <span className="pdp__price-dec">.{utils.getPrice(price, "decimal")}</span>
            </p>
          </div>

          <hr className="pdp__divider" />

          {/* Description */}
          <p className="pdp__description">{description}</p>

          {/* Features */}
          {features && features.length > 0 && (
            <div className="pdp__features">
              <h2 className="pdp__features-title">Key Features</h2>
              <ul className="pdp__features-list">
                {features.map((feat) => (
                  <li key={feat}>{feat}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right — buy box */}
        <aside className="pdp__buybox">
          <p className="pdp__buybox-price">
            <span>$</span>
            <span>{utils.getPrice(price)}</span>
            <span className="pdp__buybox-dec">.{utils.getPrice(price, "decimal")}</span>
          </p>

          <p className="pdp__buybox-delivery">
            <span className="pdp__delivery-icon">✓</span>
            FREE delivery <strong>tomorrow</strong>
          </p>
          <p className="pdp__buybox-stock pdp__in-stock">In stock</p>

          <button
            className="pdp__btn pdp__btn--cart"
            onClick={handleAddToCart}
            id="pdp-add-to-cart"
          >
            Add to Cart
          </button>
          <button
            className="pdp__btn pdp__btn--buy"
            onClick={handleBuyNow}
            id="pdp-buy-now"
          >
            Buy Now
          </button>

          <div className="pdp__buybox-meta">
            <p><span>Sold by:</span> Amazon.com</p>
            <p><span>Brand:</span> {brand}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default ProductPage;
