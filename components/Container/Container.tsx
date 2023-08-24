"use client";
import styles from "./Container.module.css";
import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode, Pagination } from "swiper/modules";

import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import cn from "classnames";
import { DateProps } from "@/types";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface DatesProps {
  dates: DateProps[];
}

export default function Container({ dates }: DatesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentDates = dates[currentIndex];
  const currentKeysDates = currentDates.keysDates.map((date) => date.date);
  const minDate = Math.min(...currentKeysDates);
  const maxDate = Math.max(...currentKeysDates);

  const animateMinDate = useMotionValue(minDate);
  const currentMinDate = useTransform(animateMinDate, (value) =>
    Math.round(value)
  );

  const animateMaxDate = useMotionValue(maxDate);
  const currentMaxDate = useTransform(animateMaxDate, (value) =>
    Math.round(value)
  );

  useEffect(() => {
    animate(animateMinDate, minDate, { duration: 0.8 });
  }, [minDate]);

  useEffect(() => {
    animate(animateMaxDate, maxDate, { duration: 0.8 });
  }, [maxDate]);

  const formatIndex = (index: number) => (index < 10 ? `0${index}` : index);

  const onPrevSlide = () => {
    setCurrentIndex((value) => (value - 1 < 0 ? dates.length - 1 : value - 1));
  };

  const onNextSlide = () => {
    setCurrentIndex((value) => (value + 1) % dates.length);
  };

  const radToDeg = (rad: number) => (rad * 180) / Math.PI;

  const RADIUS = 268;

  const pins = dates.map((date, index) => {
    const angle = (2 * Math.PI * index) / dates.length - Math.PI / dates.length;

    return {
      ...date,
      x: Math.cos(angle) * RADIUS + RADIUS,
      y: Math.sin(angle) * RADIUS + RADIUS,
      rotate: index * radToDeg((2 * Math.PI) / dates.length),
    };
  });

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2>
            Исторические
            <br />
            даты
          </h2>
        </div>

        <div className={styles.dates}>
          <motion.span className={styles.datemin}>{currentMinDate}</motion.span>
          <motion.span className={styles.datemax}>{currentMaxDate}</motion.span>
          <motion.div
            className={styles.radial}
            initial={{
              transform: "translate(-50%, -50%) rotate(0deg)",
            }}
            animate={{
              transform: `translate(-50%, -50%) rotate(${
                -currentIndex * radToDeg((2 * Math.PI) / dates.length)
              }deg)`,
            }}
            style={{ width: RADIUS * 2, height: RADIUS * 2 }}
            transition={{ type: "spring", duration: 1.3 }}
          >
            {pins.map((date, index) => (
              <motion.div
                className={cn(styles.pin, {
                  [styles.pin_active]: index === currentIndex,
                })}
                initial={{
                  transform: `translate(-50%, -50%) rotate(${date.rotate}deg)`,
                }}
                animate={{
                  transform: `translate(-50%, -50%) rotate(${
                    index === currentIndex
                      ? date.rotate
                      : pins[currentIndex].rotate
                  }deg)`,
                }}
                transition={{ type: "spring", duration: 1.3 }}
                style={{ top: date.y, left: date.x }}
                onClick={() => setCurrentIndex(index)}
                key={index}
              >
                <span className={styles.pin__index}>{index + 1}</span>
                <span className={styles.pin__title}>{date.topic}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

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
            pagination={{
              clickable: true,
            }}
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
    </div>
  );
}
