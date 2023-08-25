"use client";
import styles from "./Container.module.css";
import { useState } from "react";
import { DateProps } from "@/types";
import Events from "../Events/Events";
import Hoop from "../Hoop/Hoop";

interface DatesProps {
  dates: DateProps[];
}

export default function Container({ dates }: DatesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const onPrevSlide = () => {
    setCurrentIndex((value) => (value - 1 < 0 ? dates.length - 1 : value - 1));
  };

  const onNextSlide = () => {
    setCurrentIndex((value) => (value + 1) % dates.length);
  };

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
        <Hoop
          dates={dates}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
        <Events
          dates={dates}
          currentIndex={currentIndex}
          onPrevSlide={onPrevSlide}
          onNextSlide={onNextSlide}
        />
      </div>
    </div>
  );
}