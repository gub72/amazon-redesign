import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Slider.css'; // Seu CSS personalizado

const HeroSlider = () => {
    const slides = [
        '/assets/bannerMain/imagem1.jpg',
        '/assets/bannerMain/amazon_video_banner.mp4',
        '/assets/bannerMain/imagem2.jpg',
        '/assets/bannerMain/imagem3.jpg',
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        fade: true, // Efeito fade entre os slides
        arrows: true,
        pauseOnHover: true,
        cssEase: 'linear'
    };

    return (
        <div className="slider-container-banner">
            <Slider {...settings}>
                {slides.map((slide, index) => (
                    <div key={index} className="slide">
                        {slide.endsWith('.mp4') ? (
                            <video
                                src={slide}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="banner-video"
                            />
                        ) : (
                            <img src={slide} alt={`Slide ${index + 1}`} />
                        )}
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default HeroSlider;