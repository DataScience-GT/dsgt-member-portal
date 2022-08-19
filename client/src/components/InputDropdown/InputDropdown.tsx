import React, { FC } from "react";
import styles from "./InputDropdown.module.scss";

interface InputDropdownProps {
  options?: any[];
  initialValue?: any;
  hideInitial?: boolean;
  setState?: React.Dispatch<React.SetStateAction<any>>;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const InputDropdown: FC<InputDropdownProps> = ({
  options,
  initialValue,
  hideInitial,
  setState,
  onChange,
}: InputDropdownProps) => (
  <div className={styles.InputDropdown} data-testid="InputDropdown">
    <select
      className={styles.DropDown}
      onChange={(e) => {
        if (setState) setState(e.currentTarget.value);
        if (onChange) onChange(e);
      }}
    >
      {options
        ? options.map((o, i) => {
            if (o === initialValue) {
              if (hideInitial) {
                return "";
              } else {
                return (
                  <option
                    key={i}
                    value={o}
                    selected
                    style={{ fontWeight: 700 }}
                  >
                    {o}
                  </option>
                );
              }
            } else {
              return (
                <option key={i} value={o}>
                  {o}
                </option>
              );
            }
          })
        : ""}
    </select>
  </div>
);

export default InputDropdown;
