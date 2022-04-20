import React, { useState } from "react";
import Select from "react-select";

//from react-select library used for filtering archive posts
const CustomSelect = ({ selectOptions, setCurrCategory, id }) => {
  const [text, setText] = useState(selectOptions[0]);

  const onChange = (selectedOption) => {
    setText(selectedOption);
    setCurrCategory(selectedOption.value);
  };

  return (
    <Select id={id} options={selectOptions} onChange={onChange} value={text} />
  );
};

export default CustomSelect;
