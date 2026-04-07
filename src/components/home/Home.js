import React, { useMemo } from "react";
import "../../styles/Home.css";
import HeroSlider from "../../components/BannerMain/Slider";
import BannerCategory from "../BannerCategory/index";
import ProductShelf from "../common/ProductShelf";
import ProductShelfGrid from "../common/ProductShelfGrid";
import ProductShelfBanner from "../common/ProductShelfBanner";
import ProductShelfGridFashion from "../common/ProductShelfGridFashion";
import productsData from "../../data/products";

/* Category label mapping */
const CATEGORY_LABELS = {
  Electronics: "Eletrônicos",
  "Beauty Product": "Beleza",
  Fashion: "Moda",
  "Home Decoration": "Casa e Decoração",
  Equipments: "Equipamentos",
};

/* Categories that should use the grid-with-banners layout (Eletrônicos) */
const GRID_CATEGORIES = ["Electronics"];

/* Categories that should use the 2-banner grid layout (Moda) */
const FASHION_CATEGORIES = {
  Fashion: {
    banners: [
      "/assets/shelfBanner/shelfBanner_moda_1.png",
      "/assets/shelfBanner/shelfBanner_moda_2.png",
    ],
  },
};

/* Categories that should use the banner + 6-col grid layout */
const BANNER_CATEGORIES = {
  "Home Decoration": {
    bannerSrc: "/assets/shelfBanner/shelfBanner_casa_e_decoracao.png",
    bannerAlt: "Banner Casa e Decoração",
    maxProducts: 12, // 6 columns × 2 rows
  },
};

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
        {shelves.map((shelf) => {
          /* Eletrônicos → grid with interspersed banners */
          if (GRID_CATEGORIES.includes(shelf.category)) {
            return (
              <ProductShelfGrid
                key={shelf.category}
                title={shelf.title}
                products={shelf.products}
                linkTo={shelf.linkTo}
              />
            );
          }

          /* Moda → 6-col grid with 2 interspersed banners */
          if (FASHION_CATEGORIES[shelf.category]) {
            const cfg = FASHION_CATEGORIES[shelf.category];
            return (
              <ProductShelfGridFashion
                key={shelf.category}
                title={shelf.title}
                products={shelf.products.slice(0, 12)}
                linkTo={shelf.linkTo}
                banners={cfg.banners}
              />
            );
          }

          /* Casa e Decoração → banner + 6×2 product grid */
          if (BANNER_CATEGORIES[shelf.category]) {
            const cfg = BANNER_CATEGORIES[shelf.category];
            return (
              <ProductShelfBanner
                key={shelf.category}
                title={shelf.title}
                products={shelf.products.slice(0, cfg.maxProducts)}
                linkTo={shelf.linkTo}
                bannerSrc={cfg.bannerSrc}
                bannerAlt={cfg.bannerAlt}
              />
            );
          }

          /* Default → slider / regular shelf */
          return (
            <ProductShelf
              key={shelf.category}
              title={shelf.title}
              products={shelf.products}
              linkTo={shelf.linkTo}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Home;

