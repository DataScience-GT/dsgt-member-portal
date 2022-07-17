import React, { FC } from "react";
import styles from "./RequestLink.module.scss";
import FlexRow from "../../../layout/FlexRow/FlexRow";

export enum RequestType {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
}

interface RequestLinkProps {
  children?: React.ReactNode;
  requestType?: RequestType;
}

const RequestLink: FC<RequestLinkProps> = ({
  children,
  requestType,
}: RequestLinkProps) => (
  <div className={styles.RequestLink} data-testid="RequestLink">
    <FlexRow>
      {requestType ? (
        <span
          className={`${styles.RequestType} ${
            requestType === RequestType.GET ? styles.ItemLabelGET : ""
          } ${requestType === RequestType.POST ? styles.ItemLabelPOST : ""} ${
            requestType === RequestType.PUT ? styles.ItemLabelPUT : ""
          }`}
          title={`This api request uses a ${requestType} request type`}
        >
          {requestType}
        </span>
      ) : (
        ""
      )}
      <span
        className={styles.ItemLabel}
        title="This is an example url for the request"
      >
        {children}
      </span>
    </FlexRow>
  </div>
);

export default RequestLink;
