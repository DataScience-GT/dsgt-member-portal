import React, { FC } from "react";
import styles from "./FlexRow.module.scss";

interface FlexRowProps {
  children?: React.ReactNode;
  gap?: number;
  spacing?: string;
  padding?: string;
  height?: string;
}

const FlexRow: FC<FlexRowProps> = ({
  children,
  gap,
  spacing,
  padding,
  height,
}: FlexRowProps) => (
  <div
    className={styles.FlexRow}
    style={{
      gap: `${gap}px`,
      justifyContent: spacing,
      padding: padding,
      height: height,
    }}
    data-testid="FlexRow"
  >
    {children}
  </div>
);

export default FlexRow;
