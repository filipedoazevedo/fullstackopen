import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearchChange = (event) => setSearch(event.target.value);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Search search={search} handleSearchChange={handleSearchChange}/>
      {!search ? null : filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        <Countries filteredCountries={filteredCountries}/>
      )}
    </div>
  );
};

export default App;
