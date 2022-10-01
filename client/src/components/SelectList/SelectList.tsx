import React, { FC, SetStateAction, useState } from "react";
import styles from "./SelectList.module.scss";

interface SelectListProps {
  values?: any[];
  keys?: any[];
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  onChange?: (checked: any[]) => void;
}

const SelectList: FC<SelectListProps> = ({ keys, values, onChange }) => {
  //keep track of selected values
  const [selected, setSelected] = useState<any[]>([]);

  //generate a random identifier for all elements in list.
  let select_id = makeid(5);
  //handle changes
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newChecked = [...selected];
    if (e.target.checked) {
      //add to set
      newChecked = [...selected, e.target.value];
    } else {
      //remove from set
      newChecked.splice(newChecked.indexOf(e.target.value), 1);
    }
    setSelected(newChecked)
    // if (onChange) onChange(set);
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
          <div key={"key-" + id} data-select-id={select_id}>
            <label htmlFor={id} data-value={v} data-uid={uid}>
              <input
                id={id}
                // name={id}
                type={"checkbox"}
                value={v}
                // data-value={v}
                // data-uid={uid}
                onChange={handleCheck}
                // checked={selected.includes(v) ?? false}
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
