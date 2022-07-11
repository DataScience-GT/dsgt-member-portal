import React, { FC } from "react";
import FlexRow from "../../layout/FlexRow/FlexRow";
import styles from "./DocsSidebarItem.module.scss";
import { Link } from "react-router-dom";

export enum RequestType {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
}

interface DocsSidebarItemProps {
  label?: string;
  route?: string;
  requestType?: RequestType;
}

const DocsSidebarItem: FC<DocsSidebarItemProps> = ({
  label,
  route,
  requestType,
}: DocsSidebarItemProps) => (
  <div className={styles.DocsSidebarItem} data-testid="DocsSidebarItem">
    <Link className={styles.Link} to={route || "#"}>
      <FlexRow>
        {requestType ? (
          <span
            className={`${styles.RequestType} ${
              requestType === RequestType.GET ? styles.ItemLabelGET : ""
            } ${requestType === RequestType.POST ? styles.ItemLabelPOST : ""} ${
              requestType === RequestType.PUT ? styles.ItemLabelPUT : ""
            }`}
          >
            {requestType}
          </span>
        ) : (
          ""
        )}
        <span
          className={`${styles.ItemLabel} ${
            !requestType ? styles.ItemLabelAlone : ""
          }`}
        >
          {label}
        </span>
      </FlexRow>
    </Link>
  </div>
);

export default DocsSidebarItem;
