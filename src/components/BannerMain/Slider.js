import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Slider.css';

const HeroSlider = () => {
    const slides = [
        { src: '/assets/bannerMain/imagem1.webp', alt: 'Ofertas exclusivas em eletrônicos e gadgets' },
        { src: '/assets/bannerMain/imagem2.webp', alt: 'Novas coleções de moda para todas as estações' },
        { src: '/assets/bannerMain/amazon_video_banner.mp4', alt: 'Vídeo promocional Prime Video' },
        { src: '/assets/bannerMain/imagem3.webp', alt: 'Produtos essenciais para casa e decoração' },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        fade: true,
        arrows: true,
        pauseOnHover: true,
        cssEase: 'linear',
    };

    return (
        <section className="slider-container-banner" aria-label="Banners promocionais">
            <Slider {...settings}>
                {slides.map((slide, index) => (
                    <div key={index} className="slide">
                        {slide.src.endsWith('.mp4') ? (
                            <video
                                src={slide.src}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="banner-video"
                                aria-label={slide.alt}
                                preload="metadata"
                            >
                                <track kind="captions" srcLang="pt" label="Português" src="" default />
                            </video>
                        ) : (
                            <img
                                src={slide.src}
                                alt={slide.alt}
                                width="1200"
                                height="509"
                                loading={index === 0 ? "eager" : "lazy"}
                                decoding={index === 0 ? "sync" : "async"}
                            />
                        )}
                    </div>
                ))}
            </Slider>
        </section>
    );
};

export default HeroSlider;