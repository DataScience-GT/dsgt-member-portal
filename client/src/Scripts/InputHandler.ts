import React from "react";

export const handleChange_input_string = (
  e: React.ChangeEvent<HTMLInputElement>,
  set: React.Dispatch<React.SetStateAction<string>>
) => {
  set(e.currentTarget.value);
};
