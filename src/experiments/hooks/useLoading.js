import { useReducer, useState } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_CITIES":
      break;
    case "GET_CITY":
      break;

    default:
      return state;
  }
};

// const [weather, setWeather] = useState("");
// const [error, setError] = useState(false);
// const [cities, setCities] = useState([]);
// const [loading, setLoading] = useState(false);

const useLoading = (request) => {
  const [state, dispatch] = useReducer(reducer, {
    weather: "",
    error: false,
    cities: [],
    loading: false,
  });

  const sendRequest = (arg) => {
    dispatch({ type: arg });
  };

  return {
    sendRequest,
    state,
  };
};

export default useLoading;
