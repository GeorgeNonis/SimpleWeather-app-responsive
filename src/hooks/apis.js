import axios from "axios";
export const getData = async (cities, boolean) => {
  const url = boolean
    ? `http://api.openweathermap.org/data/2.5/weather?q=${cities}&appid=6ecf2fe9632179c173dbff234cc83200`
    : `http://api.openweathermap.org/geo/1.0/direct?q=${cities}&limit=5&appid=6ecf2fe9632179c173dbff234cc83200`;
  let data = !boolean ? [] : {};
  let type = !boolean ? "GET_CITIES" : "GET_CITY";
  // console.log({ cities }, { boolean });
  await axios
    .get(url)
    .then((res) => {
      if (res.data.length === 0) {
        throw new Error(!boolean && `No match found for ${cities}`);
      }
      !boolean ? (data = [...res.data]) : (data = { ...res.data });
    })
    .catch((err) => {
      type = "ERROR";
      // data = !boolean ? err.message : err;
      data = err.message;
    });
  return { type, data };
};
