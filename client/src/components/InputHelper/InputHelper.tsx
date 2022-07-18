import React, { FC } from "react";
import styles from "./InputHelper.module.scss";

interface InputHelperProps {
  lines?: string[];
}

const InputHelper: FC<InputHelperProps> = ({ lines }: InputHelperProps) => (
  <div className={styles.InputHelper} data-testid="InputHelper">
    {lines?.map((line, i) => {
      return <p key={i}>{line}</p>;
    })}
  </div>
);

export default InputHelper;
