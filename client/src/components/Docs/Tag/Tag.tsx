import React, { FC } from "react";
import styles from "./Tag.module.scss";

export enum Color {
  White = "white",
  Gray = "gray",
  Black = "black",
  Red = "red",
  Purple = "#9900cc",
  Pink = "#ff00ff",
  Green = "#00cc00",
  Yellow = "#ffff00",
  Orange = "#ff9900",
  Blue = "#0099ff",
}

interface TagProps {
  children?: React.ReactNode;
  color?: Color;
}

const Tag: FC<TagProps> = ({ children, color }: TagProps) => (
  <div
    className={styles.Tag}
    data-testid="Tag"
    style={{ borderColor: color, color: color }}
    title={`This request ${children?.toString().toLowerCase()}`}
  >
    {children}
  </div>
);

export default Tag;
