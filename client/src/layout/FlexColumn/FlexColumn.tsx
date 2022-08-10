import React, { FC } from "react";
import styles from "./FlexColumn.module.scss";

interface FlexColumnProps {
  children?: React.ReactNode;
  gap?: string;
  spacing?: string;
  align?: string;
  padding?: string;
  height?: string;
  width?: string;
  wrap?: "wrap" | "nowrap" | "wrap-reverse" | undefined;
}

const FlexColumn: FC<FlexColumnProps> = ({
  children,
  gap,
  spacing,
  align,
  padding,
  height,
  width,
  wrap,
}: FlexColumnProps) => (
  <div
    className={styles.FlexColumn}
    style={{
      gap: gap,
      justifyContent: spacing,
      alignItems: align,
      padding: padding,
      width: width,
      height: height,
      flexWrap: wrap !== undefined ? wrap : "wrap",
    }}
    data-testid="FlexColumn"
  >
    {children}
  </div>
);

export default FlexColumn;
