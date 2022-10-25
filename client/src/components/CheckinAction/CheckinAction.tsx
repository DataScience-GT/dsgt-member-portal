import React, { useState, FC } from "react";
import { setConstantValue } from "typescript";
import styles from './CheckinAction.module.scss';

interface CheckinActionProps {
    isSelected?: boolean;
    value?: string;
    setState?: React.Dispatch<React.SetStateAction<any>>;
}

const CheckinAction: FC<CheckinActionProps> = ({
    isSelected,
    value,
    setState,
    } : CheckinActionProps) => {
    
    const clickHandler = () => {
        if (setState && value) {
            setState(value);
        }
    }

    return (
        <button className={`${styles.CheckinAction} ${isSelected && styles.selected}`} onClick={clickHandler}>
            {value}      
        </button>
    );
};

export default CheckinAction;