import { BtCate } from "../components/ui/buttons";
import { Swiper, swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import "../styles/tour.css";
import "../styles/common.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import { InnerArea, SectionTag } from "./layout/layout";

function Tour() {
  const swiperRef = useRef();
  const [htmlTag, setHtmlTag] = useState([]);
  // 외부 데이터 연동하기(axios 이용)
  const axiosJsonData = () => {
    axios
      .get("tour.json")
      .then(function (res) {
        console.log(res.data);

        const result = res.data;
        let arr = [];
        for (let i = 0; i < result.total; i++) {
          const obj = result["tour_" + (i + 1)];
          arr[i] = obj;
        }
        console.log(arr);
        setHtmlTag(arr);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    axiosJsonData();
  }, []);

  return (
    <section className="tour">
      <div className="tour-inner">
        <div className="tour-header">
          <h2 className="tour-title">투어특가</h2>
          <span className="tour-txt"> 해외여행은 인터파크다 </span>
        </div>

        <div className="tour-main">
          <div className="tour-cotegory">
            <ul className="tour-list">
              <li>
                <button className="tour-cate-bt tour-cate-bt-active">
                  망설이면 품절
                </button>
              </li>
              <li>
                <button className="tour-cate-bt">팩키지</button>
              </li>
              <li>
                <button className="tour-cate-bt">국내숙소</button>
              </li>
              <li>
                <button className="tour-cate-bt">해외숙소</button>
              </li>
            </ul>
          </div>

          <div className="tour-slide-wrap">
            <Swiper
              slidesPerView={3}
              spaceBetween={26}
              slidesPerGroup={3}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Navigation]}
              navigation={{
                nextEl: ".tour-slide-wrap .slide-next-bt",
                prevEl: ".tour-slide-wrap .slide-prev-bt",
              }}
              className="tour-slide"
            >
              {htmlTag.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    {index === htmlTag.length - 1 ? (
                      <a href={item.url}>바로가기</a>
                    ) : (
                      <div className="tour-slide-item">
                        <a href={item.url} className="tour-slide-item-link">
                          <div className="tour-slide-item-img">
                            <img src={item.image} alt={item.event} />
                          </div>
                          <div className="tour-slide-item-info">
                            <ul className="tour-good-list">
                              <li>
                                <span className="tour-good-city">
                                  {item.building}
                                </span>
                              </li>
                              <li>
                                <span className="tour-good-city-hotel">
                                  {item.area}
                                </span>
                              </li>
                              <li>
                                <span className="tour-good-city-price">
                                  {item.price}원~
                                </span>
                              </li>
                            </ul>
                          </div>
                        </a>
                      </div>
                    )}
                  </SwiperSlide>
                );
              })}
            </Swiper>

            <button className="slide-prev-bt">
              <img src="images/slider_arrow.svg" alt="" />
            </button>
            <button className="slide-next-bt">
              <img src="images/slider_arrow.svg" alt="" />
            </button>
          </div>
        </div>

        <div className="tour-footer"></div>
      </div>
    </section>
  );
}
export default Tour;
