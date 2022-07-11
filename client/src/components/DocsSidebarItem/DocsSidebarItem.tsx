import React, { FC } from "react";
import FlexRow from "../../layout/FlexRow/FlexRow";
import styles from "./DocsSidebarItem.module.scss";

export enum RequestType {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
}

interface DocsSidebarItemProps {
  label?: string;
  requestType?: RequestType;
}

const DocsSidebarItem: FC<DocsSidebarItemProps> = ({
  label,
  requestType,
}: DocsSidebarItemProps) => (
  <div className={styles.DocsSidebarItem} data-testid="DocsSidebarItem">
    <FlexRow>
      {requestType ? (
        <span className={styles.RequestType}>{requestType}</span>
      ) : (
        ""
      )}
      <span className={styles.ItemLabel}>{label}</span>
    </FlexRow>
  </div>
);

export default DocsSidebarItem;
