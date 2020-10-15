import React, { useState, useRef, useEffect } from "react";
import "./MovieRow.css";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Link } from "react-router-dom";

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

// import { Container } from './styles';

function MovieRow({ title, items }) {
  const [scrollX, setScrollX] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  const handleResize = (e) => {
    setWidth(window.innerWidth);
  };

  /*const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };

  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listW = items.results.length * 150;
    if (window.innerWidth - listW > x) {
      x = window.innerWidth - listW - 60;
    }
    setScrollX(x);
  };*/

  return (
    <div className="movieRow">
      <h2>{title}</h2>
      {/* <div className="movieRow--left" onClick={handleLeftArrow}>
        <NavigateBeforeIcon style={{ fontSize: 50 }} />
      </div>
      <div className="movieRow--right" onClick={handleRightArrow}>
        <NavigateNextIcon style={{ fontSize: 50 }} />
      </div> */}
      <div className="movieRow--listarea">
        {console.log(width / 150)}
        <div className="movieRow--list">
          <Swiper
            slidesPerView={"auto"}
            slidesPerGroup={4}
            touchRatio={1}
            navigation
            breakpoints={{
              100: {
                slidesPerGroup: 2,
                touchRatio: 1,
              },
              650: {
                slidesPerGroup: 4,
                touchRatio: 1,
              },
              1001: {
                slidesPerGroup: 4,
                touchRatio: 0,
              },
            }}
          >
            {items.results.length > 0 &&
              items.results.map((item, key) => {
                return (
                  <SwiperSlide key={key} className="movieRow--item">
                    <img
                      draggable="false"
                      src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                      alt={item.original_title}
                    />
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default MovieRow;
