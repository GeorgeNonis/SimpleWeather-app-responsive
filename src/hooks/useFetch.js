import axios from "axios";
import { useState } from "react";

const useFetch = () => {
  const [weather, setWeather] = useState("");
  const [error, setError] = useState(false);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetching cities with the same name from different countrys
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

  // Fetching the chosen city from the list
  const fetchCity = (selectedCity) => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=6ecf2fe9632179c173dbff234cc83200`
      )
      .then((res) => {
        setCities([]);
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
  };
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
