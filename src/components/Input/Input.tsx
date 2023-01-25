import React, { FC } from "react";
import { max, min } from "../../global/range";
import styles from "./Input.module.css";

interface IInputProps {
  type: string;
  value: number | string;
  onChange(value: number): void;
  onBlur?(value: number): void;
  onMouseUp?(): void;
}

export const Input: FC<IInputProps> = ({ type, value, onChange, onBlur }) => {
  return (
    <input
      type={type}
      value={value}
      className={styles[type]}
      min={min}
      max={max}
      onChange={(e) => onChange(Number(e.target.value))}
      onBlur={(e) => onBlur && onBlur(Number(e.target.value))}
    />
  );
};
