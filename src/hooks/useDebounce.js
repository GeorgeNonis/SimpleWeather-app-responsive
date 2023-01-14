import { useEffect } from "react";

const useDebounce = (value, reqFnc, delay = 1000) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (value.length === 0) return;
      reqFnc(value, false);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);
};

export default useDebounce;
