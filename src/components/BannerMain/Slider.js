import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Slider.css';

const HeroSlider = () => {
    const slides = [
        { src: '/assets/bannerMain/imagem1.webp', alt: 'amazon echo "Alexa, toque um alarme daqui a 10 minutos." Ela responde na hora. E faz muito mais!' },
        { src: '/assets/bannerMain/imagem2.webp', alt: 'Tecnologia e praticidade para conectar você ao que realmente importa. Parcele em até 18x sem juros no cartão Amazon' },
        { src: '/assets/bannerMain/amazon_video_banner.mp4', alt: 'Vídeo promocional do Prime Video. Descubra séries e filmes exclusivos.' },   
        { src: '/assets/bannerMain/imagem3.webp', alt: 'Encontre os eletrodomésticos ideais para deixar sua casa mais prática. parcele em até 18x sem juros no cartão Amazon. frete GRÁTIS Prime' },
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
        customPaging: (i) => (
            <button aria-label={slides[i].alt}>
                {i + 1}
            </button>
        ),
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