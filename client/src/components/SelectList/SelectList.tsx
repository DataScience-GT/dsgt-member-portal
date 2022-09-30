import React, { FC, SetStateAction, useState } from "react";
import styles from "./SelectList.module.scss";

interface SelectListProps {
  values?: any[];
  keys?: any[];
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  onChange?: (checked: Set<any>) => void;
}

const SelectList: FC<SelectListProps> = ({ keys, values, onChange }) => {
  //keep track of selected values
  const [checked, setChecked] = useState<Set<any>>(new Set<any>());

  //generate a random identifier for all elements in list.
  let select_id = makeid(5);
  //handle changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.currentTarget.value;
    let set: Set<any> = checked;
    if (e.currentTarget.checked) {
      //add to set
      set.add(val);
    } else {
      //remove from set
      set.delete(val);
    }
    setChecked(set);
    console.log(set);
    if (onChange) onChange(set);
  };
  return (
    <div className={styles.SelectList} data-testid="SelectList">
      {values?.map((v, i) => {
        //create a unique id for element
        let uid = makeid(5);
        //trim value to make middle of id
        let mid = keys && keys.length ? keys[i] : v;
        if (typeof mid == "string" || mid instanceof String) {
          mid = mid.toLowerCase();
          while (mid.includes(" ")) {
            mid = mid.replace(" ", "-");
          }
        }
        //create full html id
        let id = `${select_id}-sl-${mid}-${uid}`;
        return (
          <div key={"1-" + id} data-select-id={select_id}>
            <label htmlFor={id} data-value={v} data-uid={uid}>
              <input
                key={"2-" + id}
                id={id}
                name={id}
                type={"checkbox"}
                value={v}
                data-value={v}
                data-uid={uid}
                onChange={handleChange}
                checked={checked.has(v)}
              />{" "}
              {keys && keys.length ? keys[i] : v}
            </label>
          </div>
        );
      })}
    </div>
  );
};

function makeid(length: number) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default SelectList;
