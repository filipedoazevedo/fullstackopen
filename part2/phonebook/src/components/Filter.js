import React from "react";

const Filter = ({handleSearchChange, search}) => (
  <div>
    filter show with <input onChange={handleSearchChange} value={search} />
  </div>
);

export default Filter;
