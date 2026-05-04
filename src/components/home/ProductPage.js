import React, { useMemo, useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/features/cart/cartSlice";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import Star from "../common/Star";
import * as utils from "../../logic/utils";
import productsData from "../../data/products";
import "../../styles/ProductPage.css";

const allProducts = productsData;

/* Fixed trust‑badge data */
const trustBadges = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
    label: "Pagamentos e\nSegurança",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="1" y="3" width="15" height="13" rx="2" ry="2" />
        <path d="M16 8h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2" />
        <polyline points="9 18 9 21 15 21 15 18" />
      </svg>
    ),
    label: "Enviado pela\nAmazon",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="1 4 1 10 7 10" />
        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
      </svg>
    ),
    label: "Política de\ndevolução",
  },
];

/* Fixed feature bullets when product has no features */
const defaultFeatures = [
  "Produto com garantia de qualidade e procedência.",
  "Design moderno e funcional, ideal para o dia a dia.",
  "Material de alta qualidade, resistente e durável.",
  "Compatível com diversos ambientes e ocasiões.",
  "Enviado e vendido pela Amazon — entrega rápida e segura.",
];

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [selectedThumb, setSelectedThumb] = useState(0);

  const product = useMemo(
    () => allProducts.find((p) => String(p.id) === String(id)),
    [id]
  );

  useEffect(() => {
    if (product) {
      document.title = `${product.name} — Amazon Redesign`;
    }
    return () => { document.title = "Amazon Redesign"; };
  }, [product]);

  if (!product) {
    return (
      <div className="pdp__not-found">
        <h2>Produto não encontrado.</h2>
        <Link to="/">← Voltar para a loja</Link>
      </div>
    );
  }

  const {
    name,
    image,
    price,
    oldPrice,
    rating,
    brand,
    category,
    description,
    features,
  } = product;

  const discount = oldPrice
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : 0;

  const installment = (price / 7).toFixed(2);

  const featureList =
    features && features.length > 0 ? features : defaultFeatures;

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      dispatch(addItem({ id, title: name, image, price, rating }));
    }
    toast.success(`${name} adicionado ao carrinho`);
    navigate("/checkout");
  };

  const handleBuyNow = () => {
    for (let i = 0; i < qty; i++) {
      dispatch(addItem({ id, title: name, image, price, rating }));
    }
    toast.success("Redirecionando para o pagamento...");
    navigate("/payment");
  };

  /* Simulated thumbnail list (same image repeated) */
  const thumbs = [image, image, image, image];

  return (
    <motion.div
      className="pdp"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* Breadcrumb */}
      <nav className="pdp__breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span aria-hidden="true"> › </span>
        <span>{category}</span>
        <span aria-hidden="true"> › </span>
        <span className="pdp__breadcrumb-current">{name}</span>
      </nav>

      {/* ─── Main 3‑column grid ─── */}
      <div className="pdp__main">
        {/* ══════ LEFT — Gallery ══════ */}
        <div className="pdp__gallery">
          <div className="pdp__thumbs">
            {thumbs.map((src, i) => (
              <button
                key={i}
                className={`pdp__thumb ${selectedThumb === i ? "pdp__thumb--active" : ""}`}
                onClick={() => setSelectedThumb(i)}
              >
                <img src={src} alt={`${name} thumbnail ${i + 1}`} />
              </button>
            ))}
          </div>
          <div className="pdp__img-wrapper">
            <img 
              src={image} 
              alt={`${name} — ${brand}, ${category}`} 
              className="pdp__img" 
              loading="lazy" 
              decoding="async"
              width="500"
              height="500"
            />
          </div>
          <p className="pdp__img-hint">Clique para ver a imagem completa</p>
        </div>

        {/* ══════ CENTER — Product details ══════ */}
        <div className="pdp__details">
          <h1 className="pdp__title">{name}</h1>

          <a href="#!" className="pdp__store-link">
            Visite a loja {brand}
          </a>

          <p className="pdp__platform">
            <strong>Categoria</strong>: {category}
          </p>

          {/* Rating */}
          <div className="pdp__rating-row">
            <span className="pdp__rating-num">{rating}</span>
            <div
              className="pdp__stars"
              aria-label={`Avaliação: ${rating} de 5 estrelas`}
            >
              {utils.renderRating(rating * 2).map((val, i) => (
                <Star key={i} text={val} />
              ))}
            </div>
            <span className="pdp__rating-count">
              ({Math.floor(Math.random() * 40000 + 1000)})
            </span>
          </div>

          {/* Amazon's Choice badge */}
          <div className="pdp__badge-choice">
            <span className="pdp__badge-choice-label">Escolha da Amazon</span>
          </div>

          <p className="pdp__popularity">
            Mais de <strong>{Math.floor(Math.random() * 5000 + 500)}</strong>{" "}
            compras no mês passado
          </p>

          <hr className="pdp__divider" />

          {/* ── Price block ── */}
          <div className="pdp__price-block">
            {discount > 0 && (
              <div className="pdp__deal-badge">
                <span className="pdp__deal-badge-label">Ofertas</span>
              </div>
            )}
            <div className="pdp__price-row">
              {discount > 0 && (
                <span className="pdp__discount">-{discount}%</span>
              )}
              <p className="pdp__price">
                <span className="pdp__price-sym">$</span>
                <span className="pdp__price-main">
                  {utils.getPrice(price)}
                </span>
                <span className="pdp__price-dec">
                  .{utils.getPrice(price, "decimal")}
                </span>
              </p>
            </div>
            {oldPrice && (
              <p className="pdp__old-price">
                De: <s>${oldPrice.toFixed(2)}</s>
              </p>
            )}
          </div>

          {/* Trust badges */}
          <div className="pdp__trust-badges">
            {trustBadges.map((badge, i) => (
              <div className="pdp__trust-badge" key={i}>
                <div className="pdp__trust-badge-icon">{badge.icon}</div>
                <span className="pdp__trust-badge-label">
                  {badge.label.split("\n").map((line, j) => (
                    <React.Fragment key={j}>
                      {line}
                      {j === 0 && <br />}
                    </React.Fragment>
                  ))}
                </span>
              </div>
            ))}
          </div>

          <hr className="pdp__divider" />

          {/* Installment */}
          <p className="pdp__installment">
            Em até <strong>7x</strong> de{" "}
            <strong>${installment}</strong> sem juros.{" "}
            <a href="#!">Ver opções de pagamento</a>
          </p>

          <hr className="pdp__divider" />

          {/* About this item */}
          <div className="pdp__about">
            <h2 className="pdp__about-title">Sobre este item</h2>
            <ul className="pdp__about-list">
              {featureList.map((feat, i) => (
                <li key={i}>{feat}</li>
              ))}
            </ul>
          </div>

          {/* Description */}
          {description && (
            <>
              <hr className="pdp__divider" />
              <p className="pdp__description">{description}</p>
            </>
          )}

          {/* Report link */}
          <div className="pdp__report">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
              <line x1="4" y1="22" x2="4" y2="15" />
            </svg>
            <a href="#!" aria-label="Relatar um problema com este produto">Relatar um problema com este produto</a>
          </div>
        </div>

        {/* ══════ RIGHT — Buy Box ══════ */}
        <aside className="pdp__buybox">
          {/* Prime badge */}
          <div className="pdp__prime-badge">
            <span className="pdp__prime-logo">prime</span>
            <p className="pdp__prime-text">
              Aproveite frete GRÁTIS e rápido, ofertas exclusivas, Prime Video e
              muito mais.
            </p>
            <a href="#!" className="pdp__prime-link">
              Assine o Amazon Prime
            </a>
          </div>

          <hr className="pdp__buybox-divider" />

          {/* Price */}
          <p className="pdp__buybox-price">
            <span className="pdp__buybox-price-sym">$</span>
            <span className="pdp__buybox-price-main">
              {utils.getPrice(price)}
            </span>
            <span className="pdp__buybox-price-dec">
              .{utils.getPrice(price, "decimal")}
            </span>
          </p>

          {/* Delivery */}
          <p className="pdp__buybox-delivery">
            <strong>Entrega GRÁTIS:</strong> Amanhã.{" "}
            <a href="#!">Se pedir dentro de 14 mins</a>
          </p>

          <p className="pdp__buybox-location">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Entregando em São Paulo. <a href="#!" aria-label="Atualizar local de entrega">Atualizar local</a>
          </p>

          {/* Stock */}
          <p className="pdp__buybox-stock pdp__in-stock">Em estoque</p>

          {/* Quantity */}
          <div className="pdp__buybox-qty">
            <label htmlFor="pdp-qty">Quantidade</label>
            <select
              id="pdp-qty"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <motion.button
            className="pdp__btn pdp__btn--cart"
            onClick={handleAddToCart}
            id="pdp-add-to-cart"
            whileTap={{ scale: 0.97 }}
            whileHover={{ filter: "brightness(0.95)" }}
          >
            Adicionar ao carrinho
          </motion.button>
          <motion.button
            className="pdp__btn pdp__btn--buy"
            onClick={handleBuyNow}
            id="pdp-buy-now"
            whileTap={{ scale: 0.97 }}
            whileHover={{ filter: "brightness(0.95)" }}
          >
            Comprar agora
          </motion.button>

          {/* Meta info */}
          <div className="pdp__buybox-meta">
            <div className="pdp__meta-row">
              <span className="pdp__meta-label">Enviado por</span>
              <span className="pdp__meta-value">Amazon</span>
            </div>
            <div className="pdp__meta-row">
              <span className="pdp__meta-label">Vendido por</span>
              <span className="pdp__meta-value pdp__meta-link">
                {brand}
              </span>
            </div>
            <div className="pdp__meta-row">
              <span className="pdp__meta-label">Devolução</span>
              <span className="pdp__meta-value pdp__meta-link">
                Elegível para Devolução, Reembolso em até...
              </span>
            </div>
            <div className="pdp__meta-row">
              <span className="pdp__meta-label">Pagamento</span>
              <span className="pdp__meta-value pdp__meta-link">
                Transação segura
              </span>
            </div>
          </div>

          <hr className="pdp__buybox-divider" />

          {/* Warranty / Gift */}
          <div className="pdp__buybox-extras">
            <p className="pdp__extras-title">
              Adicionar plano de seguro ou garantia:
            </p>
            <label className="pdp__extras-option">
              <input type="checkbox" />
              Garantia Estendida contra falhas e defeitos de 12 meses{" "}
              <span className="pdp__extras-price">
                por ${(price * 0.05).toFixed(2)}
              </span>
            </label>
            <label className="pdp__extras-option">
              <input type="checkbox" />
              Garantia Estendida contra falhas e defeitos de 24 meses{" "}
              <span className="pdp__extras-price">
                por ${(price * 0.08).toFixed(2)}
              </span>
            </label>
          </div>

          <hr className="pdp__buybox-divider" />

          <label className="pdp__gift-option">
            <input type="checkbox" />
            Comprar este item como presente
          </label>

          <button className="pdp__btn pdp__btn--wishlist">
            Adicionar à Lista
          </button>
        </aside>
      </div>
    </motion.div>
  );
}

export default ProductPage;
