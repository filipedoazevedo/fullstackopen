import React from "react";

const Search = ({search, handleSearchChange}) => (
  <p>
    find countries <input value={search} onChange={handleSearchChange} />
  </p>
);

export default Search;
