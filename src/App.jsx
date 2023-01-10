import axios from "axios";
import { useState } from "react";
import styles from "./App.module.scss";

const App = () => {
  const [weather, setWeather] = useState("");
  const [error, setError] = useState(false);
  const [city, setCity] = useState("");

  const fetchData = (city) => {
    setError(false);
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6ecf2fe9632179c173dbff234cc83200`;
    axios
      .get(url)
      .then((res) => {
        setWeather(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        setWeather("");
        setError(true);
      });
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      setCity(e.target.value);
      return fetchData(e.target.value);
    }
  };
  return (
    <div className={styles.app}>
      <div className={styles.input_div}>
        <input type="text" name="weather" onKeyDown={onKeyPress} />
        <h3>{weather.name}</h3>
      </div>
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
            <h3>{weather.main.humidity}</h3>
          </div>
        </main>
      )}
    </div>
  );
};

export default App;
