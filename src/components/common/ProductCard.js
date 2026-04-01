import React from "react";
import { motion } from "motion/react";
import toast from "react-hot-toast";
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
    toast.success(`${name} adicionado ao carrinho`);
  };

  return (
    <motion.div
      className="plp__card"
      id={`product-card-${id}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/product/${id}`} className="plp__card-link">
        <div className="plp__card-img-wrap">
          <img
            src={image}
            alt={`${name} — ${brand}, avaliação ${rating} de 5, $${price}`}
            className="plp__card-img"
            loading="lazy"
          />
        </div>
        <div className="plp__card-body">
          <p className="plp__card-brand">{brand}</p>
          <p className="plp__card-title">{name}</p>
          <div className="plp__card-stars" aria-label={`Avaliação: ${rating} de 5 estrelas`}>
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
            <span className="plp__delivery-check" aria-hidden="true">✓</span> Entrega grátis amanhã
          </p>
        </div>
      </Link>
      <div className="plp__card-actions">
        <motion.button
          className="plp__btn-cart"
          onClick={handleAddToCart}
          id={`plp-add-cart-${id}`}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.1 }}
        >
          Adicionar ao carrinho
        </motion.button>
      </div>
    </motion.div>
  );
}

export default ProductCard;
