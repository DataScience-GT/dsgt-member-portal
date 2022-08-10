import React, { FC, useEffect, useState } from "react";
import { createEvent } from "../../API/Event";
import ErrorText from "../../components/ErrorText/ErrorText";
import EventCard from "../../components/EventCard/EventCard";
import InputField from "../../components/InputField/InputField";
import InputLabel from "../../components/InputLabel/InputLabel";
import FlexColumn from "../../layout/FlexColumn/FlexColumn";
import FlexRow from "../../layout/FlexRow/FlexRow";
import styles from "./PortalEvent.module.scss";

interface PortalEventProps {}

const PortalEvent: FC<PortalEventProps> = () => {
  const [error, setError] = useState("");
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
      <FlexRow height="fit-content" gap={20} spacing="space-between">
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
            <FlexRow gap={10}>
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
            <FlexRow gap={10}>
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
            <ErrorText>{error}</ErrorText>
            <InputField type={"submit"} placeholder="submit" width="auto" />
          </FlexColumn>
        </form>
        <div className={styles.Right}>
          <FlexColumn gap={10}>
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
            />
          </FlexColumn>
        </div>
      </FlexRow>
    </div>
  );
};

export default PortalEvent;
