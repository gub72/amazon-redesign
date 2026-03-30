import React from "react";
import "../../styles/ProductCard.css";
import * as utils from "../../logic/utils";
import Star from "./Star";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/features/cart/cartSlice";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { id, name, image, price, rating, brand } = product;

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addItem({ id, title: name, image, price, rating }));
  };

  return (
    <div className="plp__card" id={`product-card-${id}`}>
      <Link to={`/product/${id}`} className="plp__card-link">
        <div className="plp__card-img-wrap">
          <img src={image} alt={name} className="plp__card-img" />
        </div>
        <div className="plp__card-body">
          <p className="plp__card-brand">{brand}</p>
          <p className="plp__card-title">{name}</p>
          <div className="plp__card-stars">
            {utils.renderRating(rating * 2).map((val, i) => (
              <Star key={i} text={val} />
            ))}
            <span className="plp__card-rating-num">{rating}</span>
          </div>
          <p className="plp__card-price">
            <span className="plp__price-sym">$</span>
            <span className="plp__price-main">{utils.getPrice(price)}</span>
            <span className="plp__price-dec">.{utils.getPrice(price, "decimal")}</span>
          </p>
          <p className="plp__card-delivery">
            <span className="plp__delivery-check">✓</span> Entrega grátis amanhã
          </p>
        </div>
      </Link>
      <div className="plp__card-actions">
        <button
          className="plp__btn-cart"
          onClick={handleAddToCart}
          id={`plp-add-cart-${id}`}
        >
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
