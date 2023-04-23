import React, { useState, useEffect } from "react";
import Select from "react-select";
import data from './data.json';
import './Dropdown.css';
import '../../App.css';


function Dropdown(props) {
  const [year, setYear] = useState(null);
  const [group, setGroup] = useState(null);
  const [groupList, setGroupList] = useState([]);
  const [path, setPath] = useState();

  // handle change event of the country dropdown
  const handleYearChange = (obj) => {
    setYear(obj);
    setGroupList(obj.groups);
    setGroup(null);
  };
  
  // handle change event of the language dropdown
  const handleGroupChange = (obj) => {
    setGroup(obj);
  };

  // generate the path when both dropdowns are selected
  useEffect(() => {
    if (year && group) {
      setPath(`${String(year.year)}_${group.code}`);
    }
  }, [year, group]);

  return (
    <div className="dropdownContainer">

      <div className="dropdownYear">
        <b>Year</b>
        <Select
          placeholder="Select Year"
          value={year}
          options={data}
          onChange={handleYearChange}
          getOptionLabel={x => x.year}
          getOptionValue={x => x.year}

        />
        </div>
        <div className="dropdownGroup">
        <b>Group</b>
        <Select
          placeholder="Select Group"
          value={group}
          options={groupList}
          onChange={handleGroupChange}
          getOptionLabel={x => x.name}
          getOptionValue={x => x.code}
        />
      </div>
      <div className="dropdownClick">
      <button className="dropdownClick Bttn" onClick={() => props.handlepath(path)}>Change</button>
    </div>
    </div>
  );
}

export default Dropdown;
