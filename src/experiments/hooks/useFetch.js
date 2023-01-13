import axios from "axios";
import { useCallback, useState } from "react";

const useFetch = () => {
  const [weather, setWeather] = useState("");
  const [error, setError] = useState(false);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetching cities with the same name from different countrys
  const fetchData = useCallback((city) => {
    console.log(city);
    setError(false);
    setLoading(true);
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=6ecf2fe9632179c173dbff234cc83200`;
    axios
      .get(url)
      .then((res) => {
        if (res.data.length === 0) {
          throw new Error(`No match found for ${city}`);
        }
        console.log(res.data);
        setCities(res.data);
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
        setCities([]);
        setWeather("");
      });
    setLoading(false);
  }, []);

  // Fetching the chosen city from the list
  const fetchCity = useCallback((selectedCity) => {
    console.log(selectedCity);
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=6ecf2fe9632179c173dbff234cc83200`
      )
      .then((res) => {
        setCities([]);
        console.log(res.data);
        setWeather(res.data);
      })
      .catch((err) => {
        axios
          .get(
            `http://api.openweathermap.org/data/2.5/weather?q=${selectedCity
              .split("&")
              .join(" ")}&appid=6ecf2fe9632179c173dbff234cc83200`
          )
          .then((res) => {
            setCities([]);
            setWeather(res.data);
          });
      });
  }, []);
  return {
    fetchData,
    fetchCity,
    error,
    weather,
    cities,
    loading,
  };
};

export default useFetch;
