import styles from "./Hoop.module.css";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
import { DateProps } from "@/types";
import cn from "classnames";

interface HoopProps {
  dates: DateProps[];
  currentIndex: number;
  setCurrentIndex: (value: number) => void;
}

export default function Hoop({
  dates,
  currentIndex,
  setCurrentIndex,
}: HoopProps) {
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
                index === currentIndex ? date.rotate : pins[currentIndex].rotate
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
  );
}
