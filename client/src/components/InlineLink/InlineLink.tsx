import React, { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./InlineLink.module.scss";

interface InlineLinkProps {
  to?: string;
  children?: React.ReactNode;
  margin?: string;
}

const InlineLink: FC<InlineLinkProps> = ({ to, children, margin }) => (
  <Link
    className={styles.InlineLink}
    data-testid="InlineLink"
    to={to || ""}
    style={{ margin: margin }}
  >
    {children}
  </Link>
);

export default InlineLink;
