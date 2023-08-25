import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./Events.module.css";
import { DateProps } from "@/types";
import { Navigation, FreeMode, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface EventsProps {
  dates: DateProps[];
  currentIndex: number;
  onPrevSlide: () => void;
  onNextSlide: () => void;
}

export default function Events({
  dates,
  currentIndex,
  onPrevSlide,
  onNextSlide,
}: EventsProps) {
  const formatIndex = (index: number) => (index < 10 ? `0${index}` : index);
  const currentDates = dates[currentIndex];
  return (
    <>
    <div className={styles.events}>
      <div className={styles.controls}>
        <span>
          {formatIndex(currentIndex + 1)} / {formatIndex(dates.length)}
        </span>
        <div className={styles.arrows}>
          <div className={styles.control} onClick={onPrevSlide}>
            <img src="Vector1.svg" />
          </div>
          <div className={styles.control} onClick={onNextSlide}>
            <img src="Vector2.svg" />
          </div>
        </div>
      </div>

      <div className={styles.swip}>
        <Swiper
          className={styles.swiper}
          slidesPerView="auto"
          modules={[Navigation, FreeMode, Pagination]}
          pagination
          navigation
          grabCursor
        >
          {currentDates.keysDates.map((date, index) => (
            <SwiperSlide className={styles.slide} key={index}>
              <span>{date.date}</span>
              <p>{date.text}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      </div>
    </>
  );
}
