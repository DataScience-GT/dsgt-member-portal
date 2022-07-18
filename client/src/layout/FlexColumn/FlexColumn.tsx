import React, { FC } from "react";
import styles from "./FlexColumn.module.scss";

interface FlexColumnProps {
  children?: React.ReactNode;
  gap?: number;
  spacing?: string;
  align?: string;
  padding?: string;
  height?: string;
  width?: string;
}

const FlexColumn: FC<FlexColumnProps> = ({
  children,
  gap,
  spacing,
  align,
  padding,
  height,
  width,
}: FlexColumnProps) => (
  <div
    className={styles.FlexColumn}
    style={{
      gap: `${gap}px`,
      justifyContent: spacing,
      alignItems: align,
      padding: padding,
      width: width,
      height: height,
    }}
    data-testid="FlexColumn"
  >
    {children}
  </div>
);

export default FlexColumn;
