import React, { useMemo, lazy, Suspense } from "react";
import "../../styles/Home.css";
import HeroSlider from "../../components/BannerMain/Slider";
import BannerCategory from "../BannerCategory/index";
import HighlightCards from "../common/HighlightCards";
import productsData from "../../data/products";

import ProductShelf from "../common/ProductShelf";

// Lazy load only very heavy/bottom components
const ProductShelfGrid = lazy(() => import("../common/ProductShelfGrid"));
const ProductShelfBanner = lazy(() => import("../common/ProductShelfBanner"));
const ProductShelfGridFashion = lazy(() => import("../common/ProductShelfGridFashion"));

// Loading fallback for shelves
const ShelfLoader = () => <div style={{ height: '300px', margin: '20px 0', background: 'rgba(0,0,0,0.05)', borderRadius: '8px' }} />;

/* Category label mapping */
const CATEGORY_LABELS = {
  Electronics: "Eletrônicos",
  "Beauty Product": "Beleza",
  Fashion: "Moda",
  "Home Decoration": "Casa e Decoração",
  Equipments: "Equipamentos",
};

/* Custom order for categories */
const CATEGORY_ORDER = [
  "Home Decoration",
  "Electronics",
  "Fashion",
  "Equipments",
  "Beauty Product",
];

/* Categories that should use the grid-with-banners layout (Eletrônicos) */
const GRID_CATEGORIES = ["Electronics"];

/* Categories that should use the 2-banner grid layout (Moda) */
const FASHION_CATEGORIES = {
  Fashion: {
    banners: [
      "/assets/shelfBanner/shelfBanner_moda_1.webp",
      "/assets/shelfBanner/shelfBanner_moda_2.webp",
    ],
  },
};

/* Categories that should use the banner + 6-col grid layout */
const BANNER_CATEGORIES = {
  "Home Decoration": {
    bannerSrc: "/assets/shelfBanner/shelfBanner_casa_e_decoracao.webp",
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

    return Object.entries(grouped)
      .map(([category, products]) => ({
        category,
        title: CATEGORY_LABELS[category] || `Best Sellers em ${category}`,
        products,
        linkTo: `/search?q=${encodeURIComponent(category)}`,
      }))
      .sort((a, b) => {
        const indexA = CATEGORY_ORDER.indexOf(a.category);
        const indexB = CATEGORY_ORDER.indexOf(b.category);
        return (indexA === -1 ? 99 : indexA) - (indexB === -1 ? 99 : indexB);
      });
  }, []);

  return (
    <div className="home">
      <div className="home__container">
        <HeroSlider />
        <HighlightCards />
        <BannerCategory />

        {/* Category Shelves */}
        <Suspense fallback={<ShelfLoader />}>
          {shelves.map((shelf) => {
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
        </Suspense>
      </div>
    </div>
  );
}

export default Home;

