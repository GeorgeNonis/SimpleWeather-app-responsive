import { useEffect, useState } from "react";
import styles from "./App.module.scss";
import { Error } from "./components/error";
import { IsLoading } from "./components/loading";
import { Weather } from "./components/weather";
import useFetch from "./hooks/useFetch";

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
  const { fetchData, fetchCity, error, weather, cities, loading } = useFetch();
  const [city, setCity] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchData(city);
    }, 500);

    return () => clearTimeout(timeout);
  }, [city, fetchData]);

  const onKeyPress = (e) => {
    if (e.key !== "Enter") return;
    console.log(city);
    fetchCity(sortCityName(city));
  };

  const onChangeHandler = (e) => {
    console.log(e.target.value);
    setCity(e.target.value);
  };

  let testing = [];
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
        {/* <Cities obj={{ styles, onSelectCityHandler, cleanup }} /> */}
        <h3>{weather && `${weather.name},${weather.sys.country}`}</h3>
      </div>
      <IsLoading loading={loading} styles={styles} />
      <Error error={error} styles={styles} city={city} />
      <Weather error={error} styles={styles} weather={weather} />
    </div>
  );
};

export default App;
