import { useState } from "react";
import styles from "./App.module.scss";
import useFetch from "./hooks/useFetch";

const App = () => {
  const [city, setCity] = useState("");

  const { fetchData, fetchCity, error, weather, cities, loading } = useFetch();
  // ***********************
  // HANDLERS START
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      setCity(e.target.value);
      fetchData(e.target.value);
    }
  };

  const onSelectCityHandler = (e) => {
    let city = e.target.innerHTML.split(",")[0];
    if (city.split(" ").length > 1) {
      city = city.split(" ").join("&");
    }
    console.log(city);
    fetchCity(city);
  };
  // HANDLERS END
  // ***********************
  // REMOVING DUBLICATE CITIES FROM ARRAY
  let testing = [];
  cities.map((city) => testing.push(`${city.name},${city.country}`));
  const cleanup = Array.from(new Set(testing));
  // ***********************

  const validError = error && city.length > 0 && (
    <h3 className={styles.error}>Cant find {city} in the database</h3>
  );

  const isLoading = loading && (
    <div className={styles["loading-spinner"]}></div>
  );
  const citiesList = cleanup && (
    <div className={styles.cities_div}>
      {cleanup.map((city, i) => (
        <div className={styles.cities} key={i} onClick={onSelectCityHandler}>
          {city}
        </div>
      ))}
    </div>
  );
  return (
    <div className={styles.app}>
      <div className={styles.input_div}>
        <input
          type="text"
          name="weather"
          onKeyDown={onKeyPress}
          spellCheck={true}
        />
        {citiesList}
        <h3>{weather && `${weather.name},${weather.sys.country}`}</h3>
      </div>
      {isLoading}
      {validError}
      {weather && !error && (
        <main className={styles.main_div}>
          <div>
            <h3>Description</h3>
            <h3>
              {weather.weather[0].description.charAt(0).toUpperCase() +
                weather.weather[0].description.slice(1)}
            </h3>
          </div>
          <div>
            <h3>Temperature</h3>
            <h3>{Math.round(weather.main.temp - 273.15)}°C</h3>
          </div>
          <div>
            <h3>Feels like</h3>
            <h3>{Math.round(weather.main.feels_like - 273.15)}°C</h3>
          </div>
          <div>
            <h3>Wind speed</h3>
            <h3>{weather.wind.speed} Mp/h</h3>
          </div>
          <div>
            <h3>Humidity</h3>
            <h3>{weather.main.humidity}%</h3>
          </div>
        </main>
      )}
    </div>
  );
};

export default App;
