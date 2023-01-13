export const Weather = ({ weather, error, styles }) => {
  return (
    weather &&
    !error && (
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
    )
  );
};
