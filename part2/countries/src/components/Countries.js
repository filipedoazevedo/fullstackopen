import React, { useEffect, useState } from "react";
import Country from "./Country";

const Countries = ({ filteredCountries }) => {
  const [selectedCountry, setSelected] = useState("");
  const showClickHandle = (country) => setSelected(country);

  useEffect(() => {
    if (filteredCountries.length === 1) setSelected(filteredCountries[0]);
  }, [filteredCountries]);

  return selectedCountry ? (
    <Country country={selectedCountry} />
  ) : (
    filteredCountries.map((c) => (
      <p style={{ margin: "0px" }} key={c.alpha2Code}>
        {c.name} <button onClick={() => showClickHandle(c)}>show</button>
      </p>
    ))
  );
};

export default Countries;
