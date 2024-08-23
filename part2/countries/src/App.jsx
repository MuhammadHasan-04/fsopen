import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // Import the CSS file

const Button = ({ onClick, text }) => {
  return (
    <button className="btn" onClick={onClick}>
      {text}
    </button>
  );
};

const Flag = ({ path, alt }) => {
  return <img className="flag-img" src={path} alt={alt} />;
};

const Country = ({ country }) => {
  const imgPath = country.flags.png;

  return (
    <div className="country-card">
      <h1>{country.name.common}</h1>
      <div>
        <p>Capital: {country.capital[0]}</p>
        <p>Area: {country.area} km²</p>
      </div>
      <div>
        <h3>Languages:</h3>
        <ul>
          {Object.entries(country.languages).map(([k, language]) => (
            <li key={k}>{language}</li>
          ))}
        </ul>
        <div>
          <Flag path={imgPath} alt={`Flag of ${country.name.common}`} />
        </div>
        {/* Assuming Weather component is correctly defined elsewhere */}
        <Weather
          country={country}
          apikey={process.env.REACT_APP_WEATHER_API_KEY}
        />
      </div>
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const filteredCountries = countries.filter((c) =>
    c.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  const Filter = ({ filteredCountries }) => {
    if (filteredCountries.length === 1) {
      return <Country country={filteredCountries[0]} />;
    } else if (filteredCountries.length <= 10) {
      return filteredCountries.map((c) => (
        <p key={c.name.common}>
          {c.name.common}{" "}
          <Button onClick={() => setFilter(c.name.common)} text="Show" />
        </p>
      ));
    } else {
      return <p>Too many matches, be more specific</p>;
    }
  };

  return (
    <div className="app-container">
      <h1>Countries</h1>

      <div className="search-container">
        Search: <input onChange={handleFilter} value={filter} />
      </div>

      <div className="results-container">
        <Filter filteredCountries={filteredCountries} />
      </div>

      <div className="total-countries">
        <p>
          Total number of countries: <strong>{countries.length}</strong>
        </p>
      </div>
    </div>
  );
};

export default App;
