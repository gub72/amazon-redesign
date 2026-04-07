import React, { useMemo } from "react";
import "../../styles/Home.css";
import HeroSlider from "../../components/BannerMain/Slider";
import BannerCategory from "../BannerCategory/index";
import ProductShelf from "../common/ProductShelf";
import ProductShelfGrid from "../common/ProductShelfGrid";
import productsData from "../../data/products";

/* Category label mapping */
const CATEGORY_LABELS = {
  Electronics: "Eletrônicos",
  "Beauty Product": "Beleza",
  Fashion: "Moda",
  "Home Decoration": "Casa e Decoração",
  Equipments: "Equipamentos",
};

/* Categories that should use the grid-with-banners layout */
const GRID_CATEGORIES = ["Electronics"];

function Home() {
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

  return (
    <div className="home">
      <div className="home__container">
        <HeroSlider />
        <BannerCategory />

        {/* Category Shelves */}
        {shelves.map((shelf) =>
          GRID_CATEGORIES.includes(shelf.category) ? (
            <ProductShelfGrid
              key={shelf.category}
              title={shelf.title}
              products={shelf.products}
              linkTo={shelf.linkTo}
            />
          ) : (
            <ProductShelf
              key={shelf.category}
              title={shelf.title}
              products={shelf.products}
              linkTo={shelf.linkTo}
            />
          )
        )}
      </div>
    </div>
  );
}

export default Home;
