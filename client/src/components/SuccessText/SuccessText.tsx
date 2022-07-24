import React, { FC } from "react";
import styles from "./SuccessText.module.scss";

interface SuccessTextProps {
  children?: React.ReactNode;
}

const SuccessText: FC<SuccessTextProps> = ({ children }: SuccessTextProps) => (
  <div className={styles.SuccessText} data-testid="SuccessText">
    {children}
  </div>
);

export default SuccessText;
