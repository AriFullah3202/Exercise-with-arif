import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Slider.css";
import { Parallax, Pagination, Navigation, Autoplay } from "swiper";

const Slider = () => {
    return (
        <div>

            <>
                <Swiper
                    style={{
                        "--swiper-navigation-color": "#fff",
                        "--swiper-pagination-color": "#fff",
                    }}
                    speed={600}
                    parallax={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Parallax, Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    <div
                        slot="container-start"
                        className="parallax-bg"
                        style={{
                            "backgroundImage":
                                "url(https://i.ibb.co/sWxf1JM/Online-Personal-Train.jpg)",
                        }}
                        data-swiper-parallax="-23%"
                    ></div>
                    <SwiperSlide>
                        <div className="text-xl md:text-3xl lg:text-4xl text-green-300" data-swiper-parallax="-300">
                            Home Gym Workout
          </div>

                        <div className="text" data-swiper-parallax="-100">
                            <p>
                                Focus on your personal wellness goals with group or one-on-one fitness training sessions.

            </p>
            
                        </div>
                    </SwiperSlide>
                        <SwiperSlide>
                            <div className="text-xl md:text-3xl lg:text-4xl text-green-300" data-swiper-parallax="-300">
                                Online Personal Fitness Training
          </div>

                            <div className="text" data-swiper-parallax="-100">
                                <p>
                                    You will get a specialised workout plan and virtual trainer that best fits your routine
    
            </p>
           
                            </div>
                        </SwiperSlide>

                </Swiper>
            </>

            </div>
            )
        }
        
        export default Slider
{/* <img src="https://i.ibb.co/xLbrG2n/download.jpg" alt="download" border="0"> */}