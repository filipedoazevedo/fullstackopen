import React from "react";
import Country from "./Country";

const Countries = ({ filteredCountries }) => {
  return filteredCountries.length === 1 ? (
    <Country country={filteredCountries[0]} />
  ) : (
    filteredCountries.map((c) => (
      <p style={{ margin: "0px" }} key={c.alpha2Code}>
        {c.name}
      </p>
    ))
  );
};

export default Countries;
