import { useEffect, useState } from "react";

const useDebounce = (value, delay = 1000) => {
  const [debounceValue, setData] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setData(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);
  return debounceValue;
};

export default useDebounce;
