import { useEffect, useState } from "react";
import useFetch from "./useFetch";

const cleanup = (arg) => {
  let city = arg.split(",")[0];
  if (city.split(" ").length > 1) {
    city = city.split(" ").join("&");
  }
  return city;
};

const useDebounce = (inputValue, delay = 1000) => {
  const [data, setData] = useState([]);
  const { fetchData } = useFetch();

  useEffect(() => {
    if (inputValue.length === 0) return;
    console.log(inputValue);
    const timeout = setTimeout(() => {
      setData(fetchData(cleanup(inputValue)));
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [inputValue, delay, fetchData]);
  return data;
};

export default useDebounce;
