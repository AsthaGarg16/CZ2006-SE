import React, { useState, useEffect } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

export default function SelectTimetablePageComponent({
  combinations,
  currentTimeTablePage,
  updateTimeTablePageNum,
}) {
  const [value, setValue] = useState();
  const handleChange = (event) => {
    setValue(parseInt(event.target.value));
    updateTimeTablePageNum(parseInt(event.target.value));
  };

  return (<div className = 'page'>
    <FormControl variant="outlined">
      <InputLabel htmlFor="outlined-page-native-simple">Page</InputLabel>
      <Select native value={value} onChange={handleChange} label="Page">
        {combinations.map((combination, idx) => {
          return (
            <option
              key={Math.random().toString(36).substr(2, 9)}
              value={idx + 1}
            >
              {combination.page ? combination.page : idx + 1}
            </option>
          );
        })}
      </Select>
    </FormControl></div>
  );
}
