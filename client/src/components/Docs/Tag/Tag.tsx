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

export enum TagPreset {
  Auth = "Requires Authentication",
  Input = "Requires Input Data",
  Output = "Returns Data",
}

interface TagProps {
  children?: React.ReactNode;
  color?: Color;
  preset?: TagPreset;
}

const Tag: FC<TagProps> = ({ children, color, preset }: TagProps) => {
  if (preset !== undefined) {
    if (preset === TagPreset.Auth) {
      color = Color.Blue;
    } else if (preset === TagPreset.Input) {
      color = Color.Gray;
    } else if (preset === TagPreset.Output) {
      color = Color.Green;
    }
    return (
      <div
        className={styles.Tag}
        data-testid="Tag"
        style={{ borderColor: color, color: color }}
        title={`This request ${preset?.toLowerCase()}`}
      >
        {preset === TagPreset.Auth ? (
          <a href="/docs/welcome#authentication">{preset}</a>
        ) : (
          ""
        )}
        {preset === TagPreset.Input || preset === TagPreset.Output ? (
          <a href="/docs/welcome#data">{preset}</a>
        ) : (
          ""
        )}
      </div>
    );
  } else {
    return (
      <div
        className={styles.Tag}
        data-testid="Tag"
        style={{ borderColor: color, color: color }}
        title={`This request ${children?.toString().toLowerCase()}`}
      >
        {children}
      </div>
    );
  }
};

export default Tag;
