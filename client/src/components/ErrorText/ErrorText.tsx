import React, { FC } from "react";
import styles from "./ErrorText.module.scss";

interface ErrorTextProps {
  children?: React.ReactNode;
}

const ErrorText: FC<ErrorTextProps> = ({ children }: ErrorTextProps) => (
  <div className={styles.ErrorText} data-testid="ErrorText">
    {children}
  </div>
);

export default ErrorText;
