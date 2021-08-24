import React from 'react'
import ALbum from '../../components/Slider/Slider';
import Artist from '../../components/Artist/Artist'
import AdvImage from '../../resource/images/adv.jpg'
import Genres from '../../components/Genres/Genres'
import Banner from '../../components/Banner/Banner'
import {Swiper, SwiperSlide} from "swiper/react";
import BestSong from '../../components/BestSong/BestSong'
import SwiperCore, { Autoplay, Navigation, Pagination, Virtual } from "swiper/core";
import Banner1 from '../../resource/images/banner/1.jpg'
import Banner2 from '../../resource/images/banner/2.jpg'
import Banner3 from '../../resource/images/banner/3.jpg'
import Banner4 from '../../resource/images/banner/4.jpg'
import Banner5 from '../../resource/images/banner/5.jpg'
import Banner6 from '../../resource/images/banner/6.jpg'
import "swiper/swiper-bundle.css";
import './style.css'

SwiperCore.use([Navigation, Pagination, Autoplay, Virtual]);
const HomeComponent = () => {
    return (
        <>

            {/* <!---Banner---> */}
            <Banner />
            {/* <!---Album Played Music---> */}
            <ALbum />
            {/* <!---Weekly Top 15---> */}
            <BestSong />
            {/* <!---Featured Artists Music---> */}
            <Artist />
            {/* <!----Add Section Start----> */}
            <div className="ms_advr_wrapper">
                <Swiper
                    id="banner"
                    virtual
                    slidesPerColumnFill="row"
                    spaceBetween={10}
                    resizeObserver={true}
                    dynamicBullets={true}
                    //   slidesPerGroup={4}
                    // autoplay
                    // loop
                    navigation

                >
                    <SwiperSlide key={`Banner1`}><img src={Banner1} /></SwiperSlide>
                    <SwiperSlide key={`Banner2`}><img src={Banner2} /></SwiperSlide>
                    <SwiperSlide key={`Banner3`}><img src={Banner3} /></SwiperSlide>
                    <SwiperSlide key={`Banner4`}><img src={Banner4} /></SwiperSlide>
                    <SwiperSlide key={`Banner5`}><img src={Banner5} /></SwiperSlide>
                    <SwiperSlide key={`Banner6`}><img src={Banner6} /></SwiperSlide>

                </Swiper>
            </div>
            {/* <!----Top Genres Section Start----> */}
            <Genres />

        </>
    );
}
export default HomeComponent;