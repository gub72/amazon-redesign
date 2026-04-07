import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import productsData from '../../data/products';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../styles/HighlightCards.css';

const HighlightCards = () => {
  const [lastViewed, setLastViewed] = useState(null);

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: false,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  // Helper to find product and format for card
  const getProduct = (id) => productsData.find(p => p.id === Number(id));

  const calculateDiscount = (oldPrice, price) => {
    if (!oldPrice || oldPrice <= price) return null;
    return `-${Math.round(((oldPrice - price) / oldPrice) * 100)}%`;
  };

  const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  };

  useEffect(() => {
    const savedId = localStorage.getItem('amazon_last_viewed_id');
    if (savedId) {
      const product = getProduct(savedId);
      if (product) {
        setLastViewed(product);
      }
    }
  }, []);

  const p145 = getProduct(145); // LG TV (Default fallback)
  const p104 = getProduct(104); // iPhone 14
  const p105 = getProduct(105); // Apple Watch
  const p106 = getProduct(106); // Beats
  const p121 = getProduct(121); // Samsung Buds
  const p126 = getProduct(126); // Sony Headphones
  const p132 = getProduct(132); // Nintendo Switch
  const p102 = getProduct(102); // DJI Drone
  const p101 = getProduct(101); // Canon Camera

  const currentRecentlyViewed = lastViewed || p145;

  const cardsData = [
    {
      id: 1,
      title: 'Visto recentemente',
      type: 'single',
      productName: currentRecentlyViewed?.name,
      image: currentRecentlyViewed?.image
    },
    {
      id: 2,
      title: 'Ofertas do dia',
      type: 'list',
      items: [
        {
          id: p104?.id,
          name: p104?.name,
          price: formatPrice(p104?.price),
          discount: calculateDiscount(p104?.oldPrice, p104?.price),
          image: p104?.image
        },
        {
          id: p105?.id,
          name: p105?.name,
          price: formatPrice(p105?.price),
          discount: calculateDiscount(p105?.oldPrice, p105?.price),
          image: p105?.image
        }
      ]
    },
    {
      id: 3,
      title: 'Mais vendidos em Eletrônicos',
      type: 'grid',
      items: [
        { id: p106?.id, image: p106?.image, discount: calculateDiscount(p106?.oldPrice, p106?.price) },
        { id: p121?.id, image: p121?.image, discount: calculateDiscount(p121?.oldPrice, p121?.price) },
        { id: p126?.id, image: p126?.image, discount: calculateDiscount(p126?.oldPrice, p126?.price) },
        { id: p132?.id, image: p132?.image, discount: calculateDiscount(p132?.oldPrice, p132?.price) }
      ]
    },
    {
      id: 4,
      title: 'Pay day',
      type: 'list',
      items: [
        {
          id: p102?.id,
          name: p102?.name,
          price: formatPrice(p102?.price),
          discount: calculateDiscount(p102?.oldPrice, p102?.price),
          image: p102?.image
        },
        {
          id: p101?.id,
          name: p101?.name,
          price: formatPrice(p101?.price),
          discount: calculateDiscount(p101?.oldPrice, p101?.price),
          image: p101?.image
        }
      ]
    }
  ];

  const renderCardContent = (card) => {
    switch (card.type) {
      case 'single':
        return (
          <div className="highlight-card__single">
            <img src={card.image} alt={card.productName} className="highlight-card__image-large" />
            <p className="highlight-card__product-title">{card.productName}</p>
          </div>
        );
      case 'list':
        return (
          <div className="highlight-card__list">
            {card.items.map((item) => (
              <div key={item.id} className="highlight-card__list-item">
                <img src={item.image} alt={item.name} className="highlight-card__image-thumb" />
                <div className="highlight-card__list-info">
                  {item.discount && <span className="highlight-card__discount">{item.discount}</span>}
                  <div className="highlight-card__price-row">
                    <span className="highlight-card__currency">R$</span>
                    <span className="highlight-card__price">{item.price}</span>
                  </div>
                  <p className="highlight-card__product-title">{item.name}</p>
                </div>
              </div>
            ))}
          </div>
        );
      case 'grid':
        return (
          <div className="highlight-card__grid">
            {card.items.map((item) => (
              <div key={item.id} className="highlight-card__grid-item">
                {item.discount && <span className="highlight-card__discount" style={{ position: 'absolute', right: 0, top: 0 }}>{item.discount}</span>}
                <img src={item.image} alt="GPU" className="highlight-card__image-grid" />
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="highlight-cards">
      {/* Desktop Grid */}
      <div className="highlight-cards__desktop">
        {cardsData.map((card) => (
          <div key={card.id} className="highlight-card">
            <div className="highlight-card__header">
              <h3 className="highlight-card__title">{card.title}</h3>
            </div>
            <div className="highlight-card__content">
              {renderCardContent(card)}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Slider */}
      <div className="highlight-cards__mobile">
        <Slider {...sliderSettings}>
          {cardsData.map((card) => (
            <div key={card.id}>
              <div className="highlight-card">
                <div className="highlight-card__header">
                  <h3 className="highlight-card__title">{card.title}</h3>
                </div>
                <div className="highlight-card__content">
                  {renderCardContent(card)}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default HighlightCards;
