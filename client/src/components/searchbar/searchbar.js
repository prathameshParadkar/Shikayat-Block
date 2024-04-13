import React from "react";
import { useState } from "react";

//const [searchInput, setSearchInput] = useState("");
const searchBar = () => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search here"
        //onChange={handleChange}
        //value={searchInput}
      />
    </div>
  );
};
export default searchBar;
