import React, { FC, useEffect, useState } from "react";
import ErrorText from "../../components/ErrorText/ErrorText";
import styles from "./PortalAccount.module.scss";

interface PortalAccountProps {}

const PortalAccount: FC<PortalAccountProps> = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [qrdata, setQrdata] = useState("");
  useEffect(() => {
    const serverFetch = async () => {
      await fetch("/api/user/qrcode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
        body: JSON.stringify({
          session_id: localStorage.getItem("dsgt-portal-session-key"),
        }),
      }).then(async (res) => {
        const json = await res.json();
        if (!json.ok && json.error) {
          setError(json.error);
        } else {
          setQrdata(json.qrcode);
          setLoading(false);
        }
      });
    };
    serverFetch();
  }, []);
  return (
    <div className={styles.PortalAccount} data-testid="PortalAccount">
      <h1 className={styles.Major}>Account</h1>
      <ErrorText>{error}</ErrorText>
      {loading ? (
        <div>loading...</div>
      ) : (
        <img className={styles.qrcode} src={qrdata} alt="QR Code"/>
      )}
    </div>
  );
};

export default PortalAccount;
