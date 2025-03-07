import React, { useState, useEffect } from "react";
import "./App.css";

const API_URL = "https://countriesnow.space/api/v0.1/countries/population/cities";

function App() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState(null);
  const [sortedAsc, setSortedAsc] = useState(true); // state to track sort order for Year

  // Fetch data from the API
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((json) => {
        setCities(json.data);  // Set the cities data from API response
        setLoading(false);      // Stop the loading state once data is fetched
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handle city click to toggle population details
  const handleCityClick = (cityName) => {
    setSelectedCity(selectedCity === cityName ? null : cityName);
  };

  // Handle sorting for year column
  const handleSort = () => {
    setSortedAsc(!sortedAsc); // Toggle the sorting order (ascending/descending)

    // Sort cities population counts by year for the selected city
    const sortedCities = cities.map((city) => {
      const sortedPopulationCounts = [...city.populationCounts].sort((a, b) => {
        return sortedAsc
          ? parseInt(a.year) - parseInt(b.year) // Ascending order
          : parseInt(b.year) - parseInt(a.year); // Descending order
      });
      return { ...city, populationCounts: sortedPopulationCounts };
    });

    setCities(sortedCities); // Update cities state with sorted data
  };


  

  return (
    <div className="container">
      <h1 className="heading">City Population Data</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="list">
          {cities.map((city, index) => (
            <li
              key={index}
              className="list-item"
              
            >
              <h2 className="title">{city.city} ({city.country})<span
                  className="more-info"
                  onClick={() => handleCityClick(city.city)}
                >
                  More information
                </span>
              </h2>

              {selectedCity === city.city && (
                <div>
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
                      {city.populationCounts.map((pop, popIndex) => (
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
