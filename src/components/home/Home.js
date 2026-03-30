import React, { useEffect, useState, useMemo } from "react";
import "../../styles/Home.css";
import { useSelector } from "react-redux";
import HeroSlider from "../../components/BannerMain/Slider";
import BannerCategory from "../BannerCategory/index";
import ProductShelf from "../common/ProductShelf";
import productsData from "../../data/products";

/* Category label mapping — customize shelf titles here */
const CATEGORY_LABELS = {
  Electronics: "Eletrônicos",
  "Beauty Product": "Beleza",
  Fashion: "Moda",
  "Home Decoration": "Casa e Decoração",
  Equipments: "Equipamentos",
};

function Home() {
  const cart = useSelector((state) => state.cart);

  const [alert, setAlert] = useState(null);
  const [timeOutID, setTimeOutID] = useState(null);

  /* Group products by category */
  const shelves = useMemo(() => {
    const grouped = {};
    productsData.forEach((product) => {
      const cat = product.category;
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(product);
    });

    return Object.entries(grouped).map(([category, products]) => ({
      category,
      title: CATEGORY_LABELS[category] || `Best Sellers em ${category}`,
      products,
      linkTo: `/search?q=${encodeURIComponent(category)}`,
    }));
  }, []);

  useEffect(() => {
    if (cart.length) {
      setAlert("Item added to cart");

      if (timeOutID) clearTimeout(timeOutID);

      const TID = setTimeout(() => {
        setAlert(null);
      }, 1000);

      setTimeOutID(TID);
    }
  }, [cart]);

  return (
    <div className="home">
      <div className="home__container">

        <HeroSlider />

        <BannerCategory />

        {/* Category Shelves */}
        {shelves.map((shelf) => (
          <ProductShelf
            key={shelf.category}
            title={shelf.title}
            products={shelf.products}
            linkTo={shelf.linkTo}
          />
        ))}

      </div>

      <div
        className={`mobile-hidden ${alert === "Item added to cart" ? "home__alert active" : "home__alert"
          }`}
      >
        {alert}
      </div>
    </div>
  );
}

export default Home;