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
            <SwiperSlide style={slideStyle}><img src={process.env.PUBLIC_URL+"/img/banner1.jpg"} style={{width: '100%', objectFit: 'cover'}}/></SwiperSlide>
            <SwiperSlide style={slideStyle}><img src={process.env.PUBLIC_URL+"/img/banner2.jpg"} style={{width: '100%', objectFit: 'cover'}}/></SwiperSlide>
        </Swiper>
    );
}

//{SlideImages.map((index) => <SwiperSlide style={slideStyle}><img alt="slide" src={index.default}/></SwiperSlide>)}

export default Banner;