import React, { FC } from "react";
import styles from "./FlexRow.module.scss";

interface FlexRowProps {
  children?: React.ReactNode;
  gap?: string;
  spacing?: string;
  align?: string;
  padding?: string;
  height?: string;
  width?: string;
  wrap?: "wrap" | "nowrap" | "wrap-reverse" | undefined;
}

const FlexRow: FC<FlexRowProps> = ({
  children,
  gap,
  spacing,
  align,
  padding,
  height,
  width,
  wrap,
}: FlexRowProps) => (
  <div
    className={styles.FlexRow}
    style={{
      gap: gap,
      justifyContent: spacing,
      alignItems: align,
      padding: padding,
      height: height,
      width: width,
      flexWrap: wrap !== undefined ? wrap : "wrap",
    }}
    data-testid="FlexRow"
  >
    {children}
  </div>
);

export default FlexRow;
