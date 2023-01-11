import axios from "axios";
import { useState } from "react";
import styles from "./App.module.scss";

const App = () => {
  const [weather, setWeather] = useState("");
  const [error, setError] = useState(false);
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  axios
    .get(
      `http://api.openweathermap.org/data/2.5/weather?q=Larnaca&Municipality&appid=6ecf2fe9632179c173dbff234cc83200`
    )
    .then((res) => {
      console.log(res.data);
    });

  // FETCHING START
  const fetchData = (city) => {
    setError(false);
    setLoading(true);
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=6ecf2fe9632179c173dbff234cc83200`;
    axios.get(url).then((res) => {
      if (res.data.length === 0) {
        setError(true);
        setCities([]);
        setWeather("");
        return;
      }
      console.log(res.data);
      setCities(res.data);
    });
    setLoading(false);
  };

  const fetchCity = (selectedCity) => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=6ecf2fe9632179c173dbff234cc83200`
      )
      .then((res) => {
        setCities([]);
        setWeather(res.data);
        console.log(res.data);
      });
  };
  // FETCHING END
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
  return (
    <div className={styles.app}>
      <div className={styles.input_div}>
        <input type="text" name="weather" onKeyDown={onKeyPress} />
        {cleanup && (
          <div className={styles.cities_div}>
            {cleanup.map((city, i) => (
              <div
                className={styles.cities}
                key={i}
                onClick={onSelectCityHandler}
              >
                {city}
              </div>
            ))}
          </div>
        )}
        <h3>{weather.name}</h3>
      </div>
      {loading && <div className={styles["loading-spinner"]}></div>}
      {error && city.length > 0 && (
        <h3 className={styles.error}>Cant find {city} in the database</h3>
      )}
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
