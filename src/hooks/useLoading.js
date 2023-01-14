import { useCallback, useReducer } from "react";

const reducer = (state, action) => {
  // console.log(action);
  switch (action.type) {
    case "GET_CITIES":
      return {
        ...state,
        // weather: '',
        error: false,
        loading: false,
        cities: action.data,
      };
    case "GET_CITY":
      console.log(action.data);
      return {
        error: false,
        loading: false,
        cities: [],
        weather: { ...action.data },
      };

    case "GET_DATA":
      // console.log("mpeno je dame");
      return { ...state, error: "", loading: true };
    case "ERROR":
      return { loading: false, error: action.data, cities: [], weather: "" };

    default:
      return state;
  }
};

const useLoading = (functionRequest) => {
  const [state, dispatch] = useReducer(reducer, {
    weather: "",
    error: false,
    cities: [],
    loading: false,
  });

  const sendRequest = useCallback(async (value, boolean) => {
    dispatch({ type: "GET_DATA" });

    const { type, data } = await functionRequest(value, boolean);
    // console.log({ type }, { data });
    dispatch({ type, data: data });
  }, []);

  return {
    sendRequest,
    ...state,
  };
};

export default useLoading;
