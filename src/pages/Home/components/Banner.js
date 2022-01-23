import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination} from "swiper";

import "swiper/swiper-bundle.css";
import "swiper/swiper.min.css";
import { AiFillExclamationCircle } from 'react-icons/ai';

SwiperCore.use([Navigation, Pagination]);

const Banner = () => {

    const swiperStyle = {
        width: '100%',
        height: '150px',
    };

    const slideStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        background: 'skyblue',
    }

    const SlideImages = [
        "undefined","undefined","undefined"
      ];
    
    return (
        <Swiper 
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            style={swiperStyle}
        >
            <SwiperSlide style={slideStyle}>Slide 1</SwiperSlide>
            <SwiperSlide style={slideStyle}>Slide 2</SwiperSlide>
            <SwiperSlide style={slideStyle}>Slide 3</SwiperSlide>
            <SwiperSlide style={slideStyle}>Slide 4</SwiperSlide>
        </Swiper>
    );
}

//{SlideImages.map((index) => <SwiperSlide style={slideStyle}><img alt="slide" src={index.default}/></SwiperSlide>)}

export default Banner;