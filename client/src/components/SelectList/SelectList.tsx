import React, { FC, useState } from "react";
import styles from "./SelectList.module.scss";

interface SelectListProps {
  title?: string;
  values?: any[];
  keys?: any[];
  width?: string;
  minWidth?: string;
  maxWidth?: string;
}

const SelectList: FC<SelectListProps> = ({ title, keys, values }) => {
  //keep track of selected values
  const [selected, setSelected] = useState<Set<any>>();

  //generate a random identifier for all elements in list.
  let select_id = makeid(5);
  //handle changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let checked = e.currentTarget.checked;
    let val = e.currentTarget.getAttribute("data-value");
    let set: Set<any> = selected ?? new Set<any>();
    if (!set.has(val)) {
      //add to set
      set.add(val);
    } else {
      //remove from set
      set.delete(val);
    }
    setSelected(set);
    console.log(set);
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
          <div key={id} data-select-id={select_id}>
            <input
              id={id}
              type={"checkbox"}
              data-value={v}
              data-uid={uid}
              onChange={handleChange}
              value={v}
              checked={selected && selected.has(v)}
            />
            <label htmlFor={id} data-value={v} data-uid={uid}>
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
