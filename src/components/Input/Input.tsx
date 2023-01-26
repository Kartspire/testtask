import React, { FC, LegacyRef } from "react";
import { max, min } from "../../global/range";
import styles from "./Input.module.css";

interface IInputProps {
  type: string;
  value: string;
  zIndex?: boolean;
  onChange(value: string): void;
  onBlur?(value: string): void;
  onFocus?(): void;
}

export const Input: FC<IInputProps> = ({
  type,
  value,
  zIndex,
  onChange,
  onBlur,
  onFocus,
}) => {
  return (
    <input
      type={type}
      value={value}
      className={`${styles[type]} ${zIndex && styles.zIndex}`}
      min={min}
      max={max}
      onChange={(e) => onChange(e.target.value)}
      onBlur={(e) => onBlur && onBlur(e.target.value)}
      onFocus={() => onFocus && onFocus()}
    />
  );
};
