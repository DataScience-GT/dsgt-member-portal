import React, { FC } from "react";
import styles from "./FlexColumn.module.scss";

interface FlexColumnProps {
  children?: React.ReactNode;
  gap?: number;
  spacing?: string;
  padding?: string;
}

const FlexColumn: FC<FlexColumnProps> = ({
  children,
  gap,
  spacing,
  padding,
}: FlexColumnProps) => (
  <div
    className={styles.FlexColumn}
    style={{ gap: `${gap}px`, justifyContent: spacing, padding: padding }}
    data-testid="FlexColumn"
  >
    {children}
  </div>
);

export default FlexColumn;
