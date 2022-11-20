import React, { FC } from "react";
import styles from "./InputDropdown.module.scss";

interface InputDropdownProps {
  options?: any[];
  values?: any[];
  initialValue?: any;
  hideInitial?: boolean;
  setState?: React.Dispatch<React.SetStateAction<any>>;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const InputDropdown: FC<InputDropdownProps> = ({
  options,
  values,
  initialValue,
  hideInitial,
  setState,
  onChange,
}: InputDropdownProps) => {
  // console.log(initialValue);
  return (
    <div className={styles.InputDropdown} data-testid="InputDropdown">
      <select
        className={styles.DropDown}
        onChange={(e) => {
          if (setState) setState(e.currentTarget.value);
          if (onChange) onChange(e);
        }}
       // value={initialValue}
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
                      value={
                        values && values.length === options.length
                          ? values[i]
                          : o
                      }
                      // selected
                      style={{ fontWeight: 700 }}
                    >
                      {o}
                    </option>
                  );
                }
              } else {
                return (
                  <option
                    key={i}
                    value={
                      values && values.length === options.length ? values[i] : o
                    }
                  >
                    {o}
                  </option>
                );
              }
            })
          : ""}
      </select>
    </div>
  );
};

export default InputDropdown;
