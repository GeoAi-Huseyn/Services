import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import './Brands.css';

// Appliance brands serviced across Massachusetts
const brands = [
  { name: 'Sub-Zero', img: '/assets/images/brands/subzero.svg' },
  { name: 'Wolf', img: '/assets/images/brands/wolf.svg' },
  { name: 'Viking', img: '/assets/images/brands/viking.svg' },
  { name: 'Thermador', img: '/assets/images/brands/thermador.svg' },
  { name: 'Miele', img: '/assets/images/brands/miele.svg' },
  { name: 'Bosch', img: '/assets/images/brands/bosch.svg' },
  { name: 'Gaggenau', img: '/assets/images/brands/gaggenau.svg' },
  { name: 'KitchenAid', img: '/assets/images/brands/kitchenaid.svg' },
  { name: 'JennAir', img: '/assets/images/brands/jennair.svg' },
  { name: 'Dacor', img: '/assets/images/brands/dacor.svg' },
  { name: 'Liebherr', img: '/assets/images/brands/liebherr.svg' },
  { name: 'GE Monogram', img: '/assets/images/brands/monogram.svg' },
  { name: 'Samsung', img: '/assets/images/brands/samsung.svg' },
  { name: 'LG', img: '/assets/images/brands/lg.svg' },
  { name: 'Siemens', img: '/assets/images/brands/siemens.svg' },
  { name: 'GE', img: '/assets/images/brands/ge.svg' },
  { name: 'Panasonic', img: '/assets/images/brands/panasonic.svg' },
  { name: 'Sharp', img: '/assets/images/brands/sharp.svg' },
  { name: 'Toshiba', img: '/assets/images/brands/toshiba.svg' },
  { name: 'Maytag', img: '/assets/images/brands/maytag.svg' },
];

export default function Brands() {
  return (
    <section className="tj-brand-section">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={35}
              slidesPerView={2}
              loop={true}
              touchStartPreventDefault={false}
              autoplay={{
                delay: 2200,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                480: { slidesPerView: 3, spaceBetween: 24 },
                768: { slidesPerView: 4, spaceBetween: 30 },
                1024: { slidesPerView: 6, spaceBetween: 36 },
              }}
              className="tj-brand-slider"
            >
              {brands.map((brand, idx) => (
                <SwiperSlide key={idx}>
                  <div className="brand-item wow fadeInUp" data-wow-delay=".2s">
                    <a
                      href="#services"
                      title={`${brand.name} Appliance Repair Service`}
                      className="brand-link"
                    >
                      <img
                        src={brand.img}
                        alt={`${brand.name} Repair Service`}
                        loading="lazy"
                      />
                    </a>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
