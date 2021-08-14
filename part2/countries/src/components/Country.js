import React, { useEffect, useState } from "react";
import axios from "axios";

const Header = ({ name, capital, population }) => {
  return (
    <>
      <h3>{name}</h3>
      <p>capital {capital}</p>
      <p>population {population}</p>
    </>
  );
};

const Languages = ({ languages }) => {
  return (
    <>
      <h3>Spoken languages</h3>
      <ul>
        {languages.map((l) => (
          <li key={l.iso639_1}>{l.name}</li>
        ))}
      </ul>
    </>
  );
};

const Flag = ({ flag }) => (
  <p>
    <img
      src={flag}
      alt="flag"
      style={{ width: "150px", height: "100px" }}
    ></img>
  </p>
);

const Weather = ({ weather }) => (
  <>
    {weather ? (
      <div>
        <h3>Weather in {weather.location.name}</h3>
        <b>temperature:</b> {weather.current.temperature} Celcius
        <br/>
        <img src={weather.current.weather_icons[0]} alt="weather"></img>
        <br />
        <b>wind:</b> {`${weather.current.wind_speed} mph direction ${weather.current.wind_dir}`}
      </div>
    ) : null}
  </>
);

const Country = ({ country }) => {
  const [weather, setWeather] = useState();
  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [country]);
  return (
    <>
      <Header
        name={country.name}
        capital={country.capital}
        population={country.population}
      />
      <Languages languages={country.languages} />
      <Flag flag={country.flag} />
      <Weather weather={weather} />
    </>
  );
};

export default Country;
