import axios from "axios";
import { useState } from "react";
import styles from "./App.module.scss";
import { Error } from "./components/error";
import { IsLoading } from "./components/loading";
import { Weather } from "./components/weather";
import { getData } from "./hooks/apis";
import useDebounce from "./hooks/useDebounce";
import useLoading from "./hooks/useLoading";

const sortCityName = (arg) => {
  let split = arg.split(",");
  let city = split[0];
  let country = arg.split(",")[split.length - 1];

  console.log(country);
  if (city.split(" ").length > 1) {
    city = city.split(" ").join("&");
  }
  city = city.concat(",", country);

  return city;
};

const App = () => {
  const [city, setCity] = useState("");

  const { sendRequest, error, cities, loading, weather } = useLoading(getData);

  useDebounce(city, sendRequest);

  // TESTING
  axios
    .get(
      `http://api.openweathermap.org/data/2.5/weather?q=Ok,TM&appid=6ecf2fe9632179c173dbff234cc83200`
    )
    .then((res) => console.log(res.data));

  axios
    .get(
      `http://api.openweathermap.org/geo/1.0/direct?q=Ok&limit=5&appid=6ecf2fe9632179c173dbff234cc83200`
    )
    .then((res) => console.log(res.data));

  // TESTING

  const onKeyPress = (e) => {
    if (e.key !== "Enter") return;
    sendRequest(sortCityName(city), true);
  };

  const onChangeHandler = (e) => {
    setCity(e.target.value);
  };

  let testing = [];
  cities.length > 0 &&
    cities.map((city) => testing.push(`${city.name},${city.country}`));
  const cleanup = Array.from(new Set(testing));
  // ***********************

  return (
    <div className={styles.app}>
      <div className={styles.input_div}>
        <input
          type="text"
          name="weather"
          onKeyDown={onKeyPress}
          onChange={onChangeHandler}
          list="villos"
        />
        {cleanup && (
          <datalist id="villos">
            {cleanup.map((city, i) => (
              <option key={i} value={city}>
                {city}
              </option>
            ))}
          </datalist>
        )}
        <h3>{weather && !error && `${weather.name},${weather.sys.country}`}</h3>
      </div>
      <IsLoading loading={loading} styles={styles} />
      <Error error={error} styles={styles} city={city} />
      <Weather error={error} styles={styles} weather={weather} />
    </div>
  );
};

export default App;
