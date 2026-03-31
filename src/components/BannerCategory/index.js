import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BannerCategory = () => {
    // Configurações do slider (mobile only)
    const sliderSettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: false,
    };

    // Dados padrão das categorias caso não tenha no categoriesData
    const categoryData = [
        {
            id: 1,
            name: 'Celulares',
            image: '/assets/bannerCategory/banner_category_1.png',
            link: '/categoria/celulares'
        },
        {
            id: 2,
            name: 'Notebooks',
            image: '/assets/bannerCategory/banner_category_2.png',
            link: '/categoria/notebooks'
        },
        {
            id: 3,
            name: 'Áudio',
            image: '/assets/bannerCategory/banner_category_3.png',
            link: '/categoria/audio'
        },
        {
            id: 4,
            name: 'Dispositivos',
            image: '/assets/bannerCategory/banner_category_4.png',
            link: '/categoria/dispositivos'
        },
        {
            id: 5,
            name: 'Gaming',
            image: '/assets/bannerCategory/banner_category_5.png',
            link: '/categoria/gaming'
        },
        {
            id: 6,
            name: 'Computadores',
            image: '/assets/bannerCategory/banner_category_6.png',
            link: '/categoria/computadores'
        },
        {
            id: 7,
            name: 'Outros',
            image: '/assets/bannerCategory/banner_category_7.png',
            link: '/categoria/outros'
        }
    ];

    return (
        <section className="banner-category-container">
            {/* Grid para Desktop */}
            <div className="desktop-grid">
                {categoryData.map((category) => (
                    <div key={category.id} className="category-card">
                        <img
                            src={category.image}
                            alt={category.name}
                            className="category-image"
                        />
                        <div className="category-info">
                            <h3 className="category-name">{category.name}</h3>
                            {/* <a href={category.link} className="shop-link">
                                Comprar Agora →
                            </a> */}
                        </div>
                    </div>
                ))}
            </div>

            {/* Slider para Mobile */}
            <div className="mobile-slider-container">
                <Slider {...sliderSettings}>
                    {categoryData.map((category) => (
                        <div key={category.id} className="category-slide" style={{ width: 'auto' }}>
                            <div className="category-card">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="category-image"
                                />
                                <div className="category-info">
                                    <h3 className="category-name">{category.name}</h3>
                                    <a href={category.link} className="shop-link">
                                        Comprar Agora →
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default BannerCategory;