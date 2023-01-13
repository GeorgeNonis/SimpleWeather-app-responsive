import { useState } from "react";
import styles from "./App.module.scss";
import { Cities } from "./components/cities";
import { Error } from "./components/error";
import { IsLoading } from "./components/loading";
import { Weather } from "./components/weather";
import useFetch from "./hooks/useFetch";

const App = () => {
  const [city, setCity] = useState("");

  const { fetchData, fetchCity, error, weather, cities, loading } = useFetch();
  // ***********************
  // HANDLERS START
  const onKeyPress = (e) => {
    if (e.key !== "Enter") return;

    setCity(e.target.value);
    fetchData(e.target.value);
  };

  const onSelectCityHandler = (e) => {
    let city = e.target.innerHTML.split(",")[0];
    if (city.split(" ").length > 1) {
      city = city.split(" ").join("&");
    }
    console.log({ city });
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
        <input
          type="text"
          name="weather"
          onKeyDown={onKeyPress}
          spellCheck={true}
        />
        <Cities obj={{ styles, onSelectCityHandler, cleanup }} />
        <h3>{weather && `${weather.name},${weather.sys.country}`}</h3>
      </div>
      <IsLoading loading={loading} styles={styles} />
      <Error error={error} styles={styles} city={city} />
      <Weather error={error} styles={styles} weather={weather} />
    </div>
  );
};

export default App;
