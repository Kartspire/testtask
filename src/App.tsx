import React, { useEffect, useRef, useState } from "react";
import { sendRange } from "./async/submitForm";
import { Input } from "./components/Input/Input";
import { max, min } from "./global/range";
import { IRange } from "./models/IRange";
import styles from "./styles.module.css";

export function App() {
  const [numberValue, setNumberValue] = useState<IRange>({
    low: min,
    high: max,
  });
  const [rangeValue, setRangeValue] = useState({
    low: min,
    high: max,
  });

  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> = setTimeout(() => {
      sendRange(rangeValue)!;
    }, 500);
    const lowPercent = (+rangeValue.low / +max) * 100;
    const highPercent = (+rangeValue.high / +max) * 100;
    track.current!.style.background = `linear-gradient(to right, #dadae5 ${lowPercent}% , #30352e ${lowPercent}% , #30352e ${highPercent}%, #dadae5 ${highPercent}%)`;
    return () => {
      clearTimeout(timeout);
    };
  }, [rangeValue]);

  function slideLowRange(value: string) {
    if (+rangeValue.high >= +value) {
      setRangeValue((state) => ({ ...state, low: value }));
      setNumberValue((state) => ({ ...state, low: value }));
    }
  }

  function slideHighRange(value: string) {
    if (+value >= +rangeValue.low) {
      setRangeValue((state) => ({ ...state, high: value }));
      setNumberValue((state) => ({ ...state, high: value }));
    }
  }

  function enterLowNumber(value: string) {
    if (+value <= +max && +value >= +min)
      setNumberValue((state) => ({ ...state, low: value }));
  }
  function enterLowNumberAfterBlur(value: string) {
    if (value) {
      setRangeValue((state) => ({ ...state, low: value }));
    } else setNumberValue((state) => ({ ...state, low: rangeValue.low }));

    if (+value > +rangeValue.high) {
      setNumberValue((state) => ({ ...state, high: value }));
      setRangeValue((state) => ({ ...state, high: value }));
    }
  }

  function enterHighNumber(value: string) {
    if (+value <= +max && +value >= +min)
      setNumberValue((state) => ({ ...state, high: value }));
  }
  function enterHighNumberAfterBlur(value: string) {
    if (value) {
      setRangeValue((state) => ({ ...state, high: value }));
      if (+value < +rangeValue.low) {
        setNumberValue((state) => ({ ...state, low: value }));
        setRangeValue((state) => ({ ...state, low: value }));
      }
    } else setNumberValue((state) => ({ ...state, high: rangeValue.high }));
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
          zIndex={+rangeValue.low > +max * 0.9}
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
