import React, { FC } from "react";
import styles from "./FlexColumn.module.scss";

interface FlexColumnProps {
  children?: React.ReactNode;
  gap?: number;
}

const FlexColumn: FC<FlexColumnProps> = ({
  children,
  gap,
}: FlexColumnProps) => (
  <div
    className={styles.FlexColumn}
    style={{ gap: `${gap}px` }}
    data-testid="FlexColumn"
  >
    {children}
  </div>
);

export default FlexColumn;
