import React, { FC } from "react";
import styles from "./InputField.module.scss";

interface InputFieldProps {
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  width?: string;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  onChange?: React.KeyboardEventHandler<HTMLInputElement>;
}

const InputField: FC<InputFieldProps> = ({
  type,
  placeholder,
  width,
  onClick,
  onChange,
}: InputFieldProps) => {
  if (type === "submit") {
    return (
      <div
        className={styles.InputFieldSubmit}
        data-testid="InputField"
        style={{ width: width || "300px" }}
      >
        <input
          id={"input-" + placeholder?.replaceAll(" ", "-")}
          type="submit"
          onClick={onClick}
        />
      </div>
    );
  } else {
    return (
      <div
        className={styles.InputField}
        data-testid="InputField"
        style={{ width: width || "300px" }}
      >
        <input
          id={"input-" + placeholder?.replaceAll(" ", "-")}
          type={type}
          placeholder=" "
          required
          onChange={onChange}
        />
        <label htmlFor={"input-" + placeholder}>
          {placeholder}
          <span>✓</span>
        </label>
      </div>
    );
  }
};

export default InputField;
