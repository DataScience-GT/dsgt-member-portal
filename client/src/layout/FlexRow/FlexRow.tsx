import React, { FC } from "react";
import styles from "./FlexRow.module.scss";

interface FlexRowProps {
  children?: React.ReactNode;
  gap?: number;
  spacing?: string;
  align?: string;
  padding?: string;
  height?: string;
  width?: string;
}

const FlexRow: FC<FlexRowProps> = ({
  children,
  gap,
  spacing,
  align,
  padding,
  height,
  width,
}: FlexRowProps) => (
  <div
    className={styles.FlexRow}
    style={{
      gap: `${gap}px`,
      justifyContent: spacing,
      alignItems: align,
      padding: padding,
      height: height,
      width: width,
    }}
    data-testid="FlexRow"
  >
    {children}
  </div>
);

export default FlexRow;
