import React from "react";

const Country = ({ country }) => (
  <>
    <h3>{country.name}</h3>
    <p>capital {country.capital}</p>
    <p>population {country.population}</p>
    <h3>languages</h3>
    <ul>
      {country.languages.map((l) => (
        <li key={l.iso639_1}>{l.name}</li>
      ))}
    </ul>
    <p>
      <img
        src={country.flag}
        alt="flag"
        style={{ width: "150px", height: "100px" }}
      ></img>
    </p>
  </>
);

export default Country;
