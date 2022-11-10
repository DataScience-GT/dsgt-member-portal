import React, { useState } from "react";
import CheckinAction from '../CheckinAction/CheckinAction';
import styles from './CheckinMenu.module.scss';

interface CheckinMenuProps {
    values?: any[];
    options?: any[];
    initialValue?: any;
    hideInitial?: boolean;
    setState?: React.Dispatch<React.SetStateAction<any>>;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CheckinMenu = ({
    values,
    options,
    initialValue,
    hideInitial,
    setState,
    onChange,

}: CheckinMenuProps) => {
    return (
        <div className={`${styles.CheckinMenu}`}>
            { options
                ? options.map((o, i) => {
                    if (o.toLowerCase() === initialValue) {
                        if (hideInitial) {
                            return "";
                        } else {
                            return (
                                <CheckinAction
                                    isSelected={true}
                                    value={
                                        values && values.length === options.length
                                          ? values[i]
                                          : o
                                    }
                                    key={i}
                                    setState={setState}
                                />
                            );
                        }
                    } else {
                        return (
                            <CheckinAction
                                isSelected={false}
                                value={
                                    values && values.length === options.length
                                      ? values[i]
                                      : o
                                }
                                key={i}
                                setState={setState}
                            />
                        );
                    }
                })
            : ""}
        </div>
    )
};

export default CheckinMenu;