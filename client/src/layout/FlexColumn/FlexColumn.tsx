import React, { FC } from "react";
import styles from "./FlexColumn.module.scss";

interface FlexColumnProps {
  children?: React.ReactNode;
}

const FlexColumn: FC<FlexColumnProps> = ({ children }: FlexColumnProps) => (
  <div className={styles.FlexColumn} data-testid="FlexColumn">
    {children}
  </div>
);

export default FlexColumn;
