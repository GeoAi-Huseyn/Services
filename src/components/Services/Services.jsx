import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { servicesData } from '../../data/servicesData';
import ApplianceIcon from '../Common/ApplianceIcon';

export default function Services() {
  const swiperRef = useRef(null);

  return (
    <section
      className="tj-service-section"
      id="services"
      style={{ backgroundImage: "url('assets/images/service-pattern.svg')" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="tj-heading-area text-center wow unusual-drop" data-wow-delay=".3s">
              <div className="subs-title justify-content-center">
                <span><i className="fa-solid fa-screwdriver-wrench"></i></span>
                <span className="sub-title">Our Services</span>
                <span><i className="fa-solid fa-screwdriver-wrench"></i></span>
              </div>
              <h2 className="title">We Are Here For You</h2>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 position-relative">
            <div className="service-slider-wrapper position-relative wow unusual-unfold" data-wow-delay=".1s">

              <Swiper
                onBeforeInit={(swiper) => {
                  swiperRef.current = swiper;
                }}
                modules={[Pagination, Autoplay]}
                spaceBetween={24}
                slidesPerView={1}
                loop={true}
                touchStartPreventDefault={false}
                autoplay={{
                  delay: 4500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                pagination={{ clickable: true }}
                breakpoints={{
                  576: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  992: { slidesPerView: 3 },
                  1200: { slidesPerView: 3 },
                }}
                className="tj-service-slider"
              >
                {servicesData.map((item) => (
                  <SwiperSlide key={item.id}>
                    <div className="tj-service-item">
                      <div className="service-content">
                        <h4 className="service-title">
                          <Link to={`/service/${item.slug}`}>{item.title}</Link>
                        </h4>
                        <div className="desc">
                          <p>{item.desc}</p>
                        </div>
                        <div className="service-icon">
                          <span>
                            <ApplianceIcon iconKey={item.iconKey || item.slug} size={28} color="currentColor" />
                          </span>
                        </div>
                      </div>
                      <div className="service-images">
                        <Link to={`/service/${item.slug}`}>
                          <img src={item.image} alt={item.title} />
                        </Link>
                      </div>
                      <div className="service-button">
                        <Link className="tj-transparent-btn" to={`/service/${item.slug}`}>
                          View Details
                          <span className="icon_box">
                            <i className="icon_first fa-regular fa-arrow-right"></i>
                            <i className="icon_second fa-regular fa-arrow-right"></i>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
