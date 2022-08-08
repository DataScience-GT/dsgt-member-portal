import React, { FC, useEffect, useState } from "react";
import { createEvent } from "../../API/Event";
import ErrorText from "../../components/ErrorText/ErrorText";
import InputField from "../../components/InputField/InputField";
import styles from "./PortalEvent.module.scss";

interface PortalEventProps {}

const PortalEvent: FC<PortalEventProps> = () => {
  const [error, setError] = useState("");
  const [FR, setFR] = useState(new FileReader());
  const [imgData, setImgData] = useState("");
  // const [imgFile, setImgFile] = useState<File>();

  useEffect(() => {
    FR.addEventListener("load", loadImageData);
    return () => {
      FR.removeEventListener("load", loadImageData);
    };
  }, [FR]);

  const loadImageData = (e: ProgressEvent<FileReader>) => {
    if (e.target && e.target.result) {
      setImgData(e.target.result.toString());
    }
  };

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      let file = e.currentTarget.files[0];
      FR.readAsDataURL(file);
      // setImgFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!imgData) {
      setError("Missing one or more required fields.");
      return;
    }
    await createEvent(imgData, () => {
      console.log("done");
    });
  };
  return (
    <div className={styles.PortalEvent} data-testid="PortalEvent">
      <h1 className={styles.Major}>Events</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImage}
        />
        <ErrorText>{error}</ErrorText>
        <InputField type={"submit"} placeholder="submit" />
      </form>
    </div>
  );
};

export default PortalEvent;
