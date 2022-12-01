import React, { FC } from "react";
import styles from "./CheckinEvent.module.scss";

interface CheckinEventProps {
    id?: number;
    value?: String;
    selectedId?: number;
    changeSelected?: React.Dispatch<React.SetStateAction<any>>;
}

const CheckinEvent: FC<CheckinEventProps> = ({
    id,
    value,
    selectedId,
    changeSelected,
} : CheckinEventProps) => {

    const dummyData = [
        "Bill Gates",
        "Bill Clinton",
        "Jeffery Epstein",
    ]

    const clickHandler = () => {
        //if selected element is selected again, toggle off
        //else, set universal selectedId to local id
        if (changeSelected) {
            if (selectedId === id) {
                changeSelected(0);
            } else {
                changeSelected(id);
            }
        }
    };

    return (
        //Styling for component depends on which id is currently selected
        <div>
            <button
                className={`${styles.CheckinEventCard} ${selectedId === id && styles.selected}`}
                onClick={clickHandler}
                >
                    {value}
                    <div className={styles.scannedTag}>
                        {dummyData.length} scanned in
                    </div>
            </button>
            <ul className={`${styles.CheckinEventNamesCard} ${selectedId === id && styles.selectedd}`}>
                {dummyData?.map((n, i) => (
                    //TODO: filter scanned students using event id and map their names here
                    <li>
                        {n}
                    </li>
                ))}
            </ul>
        </div>
        );
};

export default CheckinEvent;