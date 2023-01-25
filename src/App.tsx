import React, { useEffect, useRef, useState } from "react";
import { sendRange } from "./async/submitForm";
import { Input } from "./components/Input/Input";
import { max, min, minRange } from "./global/range";
import { IRange } from "./models/IData";
import styles from "./styles.module.css";

export function App() {
  const [numberValue, setNumberValue] = useState<IRange>({
    low: minRange,
    high: max - minRange,
  });
  const [rangeValue, setRangeValue] = useState({
    low: minRange,
    high: max - minRange,
  });

  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> = setTimeout(() => {
      sendRange(rangeValue)!;
    }, 500);
    const lowPercent = (rangeValue.low / max) * 100;
    const highPercent = (rangeValue.high / max) * 100;
    track.current!.style.background = `linear-gradient(to right, #dadae5 ${lowPercent}% , #30352e ${lowPercent}% , #30352e ${highPercent}%, #dadae5 ${highPercent}%)`;
    return () => {
      clearTimeout(timeout);
    };
  }, [rangeValue]);

  function slideLowRange(value: number) {
    if (rangeValue.high - value > minRange) {
      setRangeValue((state) => ({ ...state, low: value }));
      setNumberValue((state) => ({ ...state, low: value }));
    }
  }

  function slideHighRange(value: number) {
    if (value - rangeValue.low > minRange) {
      setRangeValue((state) => ({ ...state, high: value }));
      setNumberValue((state) => ({ ...state, high: value }));
    }
  }

  function enterLowNumber(value: number) {
    if (value <= max && value >= min)
      setNumberValue((state) => ({ ...state, low: value }));
  }
  function enterLowNumberAfterBlur(value: number) {
    setRangeValue((state) => ({ ...state, low: value }));
    if (value > rangeValue.high) {
      setNumberValue((state) => ({ ...state, high: value }));
      setRangeValue((state) => ({ ...state, high: value }));
    }
  }

  function enterHighNumber(value: number) {
    if (value <= max && value >= min)
      setNumberValue((state) => ({ ...state, high: value }));
  }
  function enterHighNumberAfterBlur(value: number) {
    setRangeValue((state) => ({ ...state, high: value }));
    if (value < rangeValue.low) {
      setNumberValue((state) => ({ ...state, low: value }));
      setRangeValue((state) => ({ ...state, low: value }));
    }
  }

  return (
    <form className={styles.container}>
      <div className={styles.valuesWrapper}>
        <Input
          type="number"
          value={numberValue.low}
          onChange={enterLowNumber}
          onBlur={enterLowNumberAfterBlur}
          onFocus={() => {
            setNumberValue((state) => ({ ...state, low: "" }));
          }}
        ></Input>
        <Input
          type="number"
          value={numberValue.high}
          onChange={enterHighNumber}
          onBlur={enterHighNumberAfterBlur}
          onFocus={() => {
            setNumberValue((state) => ({ ...state, high: "" }));
          }}
        ></Input>
      </div>
      <div className={styles.rangeWrapper}>
        <div className={styles.track} ref={track}></div>
        <Input
          type="range"
          value={rangeValue.low}
          onChange={slideLowRange}
        ></Input>
        <Input
          type="range"
          value={rangeValue.high}
          onChange={slideHighRange}
        ></Input>
      </div>
    </form>
  );
}
