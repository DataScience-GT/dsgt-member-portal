import React, { FC, useState } from "react";
import styles from "./InlineRadioInput.module.scss";

interface InlineRadioInputProps {
  color?: string;
  icon?: string;
  label?: string;
  value?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "radio" | "checkbox";
  currentValue?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
}

const InlineRadioInput: FC<InlineRadioInputProps> = ({
  color,
  icon,
  label,
  value,
  name,
  onChange,
  type,
  currentValue,
  setValue,
}: InlineRadioInputProps) => {
  let id = `radio-${name?.replaceAll(" ", "-")}-${label?.replaceAll(" ", "-")}`;
  let checked =
    currentValue === value || currentValue === label?.replaceAll(" ", "-");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) {
      //checked
      if (setValue && (value || label))
        setValue(value ? value : label ? label?.replaceAll(" ", "-") : "");
    }
    if (onChange) onChange(e);
  };

  return (
    <div className={styles.InlineRadioInput} data-testid="InlineRadioInput">
      <input
        className={styles.Input}
        id={id}
        type={type ?? "radio"}
        name={name}
        value={value}
        style={{ display: "none" }}
        onChange={handleChange}
        checked={checked}
      />
      <label
        className={styles.Label}
        htmlFor={id}
        style={
          checked
            ? { backgroundColor: color, borderColor: color }
            : { borderColor: color, color: color }
        }
      >
        {label}
      </label>
    </div>
  );
};

export default InlineRadioInput;
