import React, { useState, useEffect } from "react";
import "./App.css";

const API_URL = "https://countriesnow.space/api/v0.1/countries/population/cities";

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showCities, setShowCities] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [sortedAsc, setSortedAsc] = useState(true);

  // Fetch data from API
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data); // Check the API structure
        setCountries(data.data);
        setLoading(false);
        const countryData = {};

        data.data.forEach((city) => {
          const country = city.country;

          if (!countryData[country]) {
            countryData[country] = {
              countryName: country,
              populationCounts: [],
              cities: [],
            };
          }

          // Aggregate total population per year for the country
          city.populationCounts.forEach((pop) => {
            const existingYear = countryData[country].populationCounts.find(
              (p) => p.year === pop.year
            );

            if (existingYear) {
              existingYear.value += pop.value;
            } else {
              countryData[country].populationCounts.push({ ...pop });
            }
          });

          // Store cities belonging to the country
          countryData[country].cities.push({
            cityName: city.city,
            populationCounts: city.populationCounts,
          });
        });

        setCountries(Object.values(countryData));
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Toggle country population data
  const handleCountryClick = (countryName) => {
    setSelectedCountry(selectedCountry === countryName ? null : countryName);
    setShowCities(null); // Reset city list when clicking on country
    setSelectedCity(null); // Reset selected city
  };

  // Toggle city list inside a country
  const handleMoreInfoClick = (countryName) => {
    setShowCities(showCities === countryName ? null : countryName);
    setSelectedCity(null); // Reset city selection when switching countries
  };

  // Toggle city-specific data
  const handleCityClick = (cityName) => {
    setSelectedCity(selectedCity === cityName ? null : cityName);
  };

  // Handle sorting by year
  const handleSort = () => {
    setSortedAsc(!sortedAsc);
  
    const sortedCountries = countries.map((country) => {
      const sortedPop = [...country.populationCounts].sort((a, b) =>
        sortedAsc ? parseInt(a.year) - parseInt(b.year) : parseInt(b.year) - parseInt(a.year)
      );
  
      const sortedCities = country.cities.map((city) => ({
        ...city,
        populationCounts: [...city.populationCounts].sort((a, b) =>
          sortedAsc ? parseInt(a.year) - parseInt(b.year) : parseInt(b.year) - parseInt(a.year)
        ),
      }));
  
      return { ...country, populationCounts: sortedPop, cities: sortedCities };
    });
  
    setCountries(sortedCountries);
  };
  return (
    <div className="container">
      <h1 className="heading">Country Population Data</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="list">
          {countries.map((country, index) => (
            <li key={index} className="list-item">
              {/* Country Name Clickable */}
              <h2 className="title" onClick={() => handleCountryClick(country.countryName)}>
                {country.countryName}
              </h2>

              {/* "More Info" to show cities */}
              <span
                className="more-info"
                onClick={() => handleMoreInfoClick(country.countryName)}
              >
                {showCities === country.countryName ? "Hide Cities" : "More Info"}
              </span>

              {/* Show country population data when clicked */}
              {selectedCountry === country.countryName && (
                <table className="population-table">
                  <thead>
                    <tr>
                      <th>
                        Year
                        <button className="sort-button" onClick={handleSort}>
                          {sortedAsc ? "▲" : "▼"}
                        </button>
                      </th>
                      <th>Population</th>
                      <th>Sex</th>
                      <th>Reliability</th>
                    </tr>
                  </thead>
                  <tbody>
                    {country.populationCounts.map((pop, popIndex) => (
                      <tr key={popIndex}>
                        <td>{pop.year}</td>
                        <td>{pop.value}</td>
                        <td>{pop.sex}</td>
                        <td>{pop.reliabilty ? pop.reliabilty : "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* Show list of cities inside the country */}
              {showCities === country.countryName && (
                <ul>
                {country.cities.map((city, cityIndex) => (
                  <li 
                    key={cityIndex} 
                    onClick={() => handleCityClick(city.cityName)}
                    className={selectedCity === city.cityName ? "selected-city" : ""}
                  >
                    {city.cityName}
                  </li>
                ))}
              </ul>
              )}

              {/* Show city-specific data */}
              {selectedCity && showCities === country.countryName && (
                <div>
                  <h4>City Population Info: {selectedCity}</h4>
                  <table className="population-table">
                    <thead>
                      <tr>
                        <th>Year<button className="sort-button" onClick={handleSort}>
                          {sortedAsc ? "▲" : "▼"}
                        </button></th>
                        <th>Population</th>
                        <th>Sex</th>
                        <th>Reliability</th>
                      </tr>
                    </thead>
                    <tbody>
                      {country.cities
                        .find((city) => city.cityName === selectedCity)
                        .populationCounts.map((pop, popIndex) => (
                          <tr key={popIndex}>
                            <td>{pop.year}</td>
                            <td>{pop.value}</td>
                            <td>{pop.sex}</td>
                            <td>{pop.reliabilty}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
