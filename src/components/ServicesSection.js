import { servicesSliderProps } from "../sliderProps"
import {Swiper,SwiperSlide} from "swiper/react"


export function ServicesSection({ services }){

    return (
        <section
            className="lui-section lui-gradient-bottom"
            id="services-section"
        >
            {/* Heading */}
            <div className="lui-heading">
                <div className="container">
                    <div className="m-titles align-center">
                        <h2
                            className="m-title splitting-text-anim-1 scroll-animate"
                            data-splitting="words"
                            data-animate="active"
                        >
                            <span> What I Do </span>
                        </h2>
                        <div
                            className="m-subtitle splitting-text-anim-1 scroll-animate"
                            data-splitting="words"
                            data-animate="active"
                        >
                            <span>
                                {" "}
                                my <b>Services</b>{" "}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Services */}
            <div className="v-line v-line-right">
                <div className="container">
                    <Swiper
                        {...servicesSliderProps}
                        className="swiper-container js-services scrolla-element-anim-1 scroll-animate"
                        data-animate="active"
                    >
                        {services.map((service, index) => (
                            //  mapping each item and displaying if enabled is true
                            service.enabled &&
                            <SwiperSlide className="swiper-slide" key={index} id={service.id}>
                                <div className="services-item-bg" style={{ backgroundImage: `url(${service.image?.url})` }}>
                                    <div className="services-item">
                                        <div className="icon" />
                                        <h5 className="lui-title">
                                            <span> {service.name}</span>
                                        </h5>
                                        <div className="lui-text">
                                            <div>
                                                {" "}
                                                {service.desc}.{" "}
                                            </div>
                                        </div>
                                        <a href="#pricing-section" className="lnk">
                                            {" "}
                                            {service.charge}{" "}
                                        </a>
                                        <div
                                            className="image"
                                            style={{
                                                backgroundImage: "url(assets/images/pat-2.png)",
                                            }}
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                        <div className="swiper-pagination" />
                    </Swiper>
                    <div className="lui-bgtitle">
                        <span> Services </span>
                    </div>
                </div>
            </div>
        </section>
    )
}