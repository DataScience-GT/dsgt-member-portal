import React, { FC, useEffect, useState } from "react";
import { createEvent } from "../../API/Event";
import ErrorText from "../../components/ErrorText/ErrorText";
import EventCard from "../../components/EventCard/EventCard";
import InputField from "../../components/InputField/InputField";
import InputLabel from "../../components/InputLabel/InputLabel";
import Modal, { ModalPreset } from "../../components/Modal/Modal";
import SuccessText from "../../components/SuccessText/SuccessText";
import FlexColumn from "../../layout/FlexColumn/FlexColumn";
import FlexRow from "../../layout/FlexRow/FlexRow";
import styles from "./PortalEvent.module.scss";

interface PortalEventProps {}

const PortalEvent: FC<PortalEventProps> = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [FR, setFR] = useState(new FileReader());
  const [eventName, setEventName] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [imgData, setImgData] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [link, setLink] = useState("");
  // const [imgFile, setImgFile] = useState<File>();

  useEffect(() => {
    FR.addEventListener("load", loadImageData);
    return () => {
      FR.removeEventListener("load", loadImageData);
    };
  }, [FR]);

  const handleChange_input = (
    e: React.ChangeEvent<HTMLInputElement>,
    setValue?: React.Dispatch<React.SetStateAction<any>>
  ) => {
    // console.log(e.currentTarget.value);
    if (setValue) {
      setValue(e.currentTarget.value);
    }
  };
  const handleChange_textarea = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    setValue?: React.Dispatch<React.SetStateAction<any>>
  ) => {
    // console.log(e.currentTarget.value);
    if (setValue) {
      setValue(e.currentTarget.value);
    }
  };

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
    setSuccess("");
    if (!(imgData && eventName && shortDescription)) {
      setError("Missing one or more required fields.");
      return;
    }
    setShowConfirmModal(true);
  };

  const handleCreateEvent = async () => {
    setError("");
    setSuccess("");
    await createEvent(
      eventName,
      eventLocation,
      imgData,
      startDate,
      startTime,
      endDate,
      endTime,
      shortDescription,
      longDescription,
      link,
      () => {
        setSuccess("Event Created.");
      }
    );
  };
  return (
    <div className={styles.PortalEvent} data-testid="PortalEvent">
      <h1 className={styles.Major}>Events</h1>
      <FlexRow
        height="fit-content"
        gap="5em"
        spacing="flex-start"
        wrap="wrap-reverse"
      >
        <form className={styles.Left} onSubmit={handleSubmit}>
          <h2 className={styles.Minor}>Create an Event</h2>
          <FlexColumn width="100%">
            <InputField
              type={"text"}
              placeholder="Event Name"
              required
              onChange={(e) => {
                handleChange_input(e, setEventName);
              }}
              width="auto"
            />
            <InputField
              type={"text"}
              placeholder="Event Location"
              onChange={(e) => {
                handleChange_input(e, setEventLocation);
              }}
              width="auto"
            />
            <InputLabel htmlFor="image" required>
              Event Image
            </InputLabel>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImage}
              required
            />
            <FlexRow gap="10px">
              <InputField
                type={"date"}
                placeholder="starting date"
                onChange={(e) => {
                  handleChange_input(e, setStartDate);
                }}
                width="auto"
              />
              <InputField
                type={"time"}
                placeholder="starting time"
                onChange={(e) => {
                  handleChange_input(e, setStartTime);
                }}
                width="auto"
              />
            </FlexRow>
            <FlexRow gap="10px">
              <InputField
                type={"date"}
                placeholder="ending date"
                onChange={(e) => {
                  handleChange_input(e, setEndDate);
                }}
                width="auto"
              />
              <InputField
                type={"time"}
                placeholder="ending time"
                onChange={(e) => {
                  handleChange_input(e, setEndTime);
                }}
                width="auto"
              />
            </FlexRow>
            <InputLabel htmlFor="short-description" required>
              Short Description
            </InputLabel>
            <textarea
              className={styles.TextBox}
              name="short-description"
              placeholder="Type your short description here..."
              maxLength={150}
              required
              onChange={(e) => {
                handleChange_textarea(e, setShortDescription);
              }}
            ></textarea>
            <InputLabel htmlFor="long-description">Long Description</InputLabel>
            <textarea
              className={styles.TextBox}
              name="long-description"
              placeholder="Type your long description here..."
              maxLength={1000}
              onChange={(e) => {
                handleChange_textarea(e, setLongDescription);
              }}
            ></textarea>
            <InputField
              type={"url"}
              placeholder="Link To (URL)"
              name="url"
              onChange={(e) => {
                handleChange_input(e, setLink);
              }}
              width="auto"
              validIndication
            />
            <ErrorText>{error}</ErrorText>
            <SuccessText>{success}</SuccessText>
            <InputField type={"submit"} placeholder="submit" width="auto" />
          </FlexColumn>
        </form>
        <div className={styles.Right}>
          <FlexColumn gap="10px">
            <h2 className={styles.Minor}>
              Here's how the event will look to members:
            </h2>
            <EventCard
              name={eventName}
              location={eventLocation}
              imageSRC={imgData}
              startDate={startDate}
              startTime={startTime}
              endDate={endDate}
              endTime={endTime}
              shortDescription={shortDescription}
              longDescription={longDescription}
              link={link}
              big
            />
            <EventCard
              name={eventName}
              location={eventLocation}
              imageSRC={imgData}
              startDate={startDate}
              startTime={startTime}
              endDate={endDate}
              endTime={endTime}
              shortDescription={shortDescription}
              longDescription={longDescription}
              link={link}
            />
          </FlexColumn>
        </div>
      </FlexRow>
      <Modal
        open={showConfirmModal}
        setOpen={setShowConfirmModal}
        preset={ModalPreset.Confirm}
        handleConfirmed={handleCreateEvent}
      >
        Are you sure you would like to create this event?
      </Modal>
    </div>
  );
};

export default PortalEvent;
