import React, { FC } from "react";
import FlexRow from "../../layout/FlexRow/FlexRow";
import styles from "./DocsSidebarItem.module.scss";

export enum RequestType {
  GET,
  POST,
  PUT,
}

const REQUEST_TYPES = ["GET", "POST", "PUT"];

interface DocsSidebarItemProps {
  requestType?: RequestType;
}

const DocsSidebarItem: FC<DocsSidebarItemProps> = ({
  requestType,
}: DocsSidebarItemProps) => (
  <div className={styles.DocsSidebarItem} data-testid="DocsSidebarItem">
    <FlexRow>
      <span className={styles.RequestType}>
        {requestType !== undefined ? REQUEST_TYPES[requestType] : ""}
      </span>{" "}
      <span className={styles.ItemLabel}></span>DocsSidebarItem Component
    </FlexRow>
  </div>
);

export default DocsSidebarItem;
