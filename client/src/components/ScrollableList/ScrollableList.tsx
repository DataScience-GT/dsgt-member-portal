import React, { FC } from "react";
import FlexColumn from "../../layout/FlexColumn/FlexColumn";
import styles from "./ScrollableList.module.scss";

interface ScrollableListProps {
  height?: string;
  maxHeight?: string;
  width?: string;
  minWidth?: string;
  values?: string[];
  clickable?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>, value: string) => void;
}

const ScrollableList: FC<ScrollableListProps> = ({
  height,
  maxHeight,
  width,
  minWidth,
  values,
  clickable,
  onClick,
}) => (
  <div
    className={styles.ScrollableList}
    data-testid="ScrollableList"
    style={{
      height: height || "fit-content",
      width: width || "15em",
      maxHeight: maxHeight || "15em",
      minWidth: minWidth || "0",
    }}
  >
    <FlexColumn gap="1px">
      {!values || values?.length <= 0 ? (
        <div className={styles.Nothing} data-testid="Nothing">
          Nothing to show here :(
        </div>
      ) : (
        values?.map((v, i) => (
          <div
            data-testid="Item"
            key={`${v}-${i}`}
            className={`${styles.Item} ${clickable ? styles.Clickable : ""}`}
            onClick={(e) => {
              if (onClick) onClick(e, v);
            }}
          >
            {v}
          </div>
        ))
      )}
    </FlexColumn>
  </div>
);

export default ScrollableList;
