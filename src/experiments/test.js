import axios from "axios";

export const getCities = async (cities) => {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cities}&limit=5&appid=6ecf2fe9632179c173dbff234cc83200`;
  let data = [];
  let type = "GET_CITIES";
  // console.log(cities);
  await axios
    .get(url)
    .then((res) => {
      if (res.data.length === 0) {
        throw new Error(`No match found for ${cities}`);
      }
      // console.log(res.data);
      data = [...res.data];
    })
    .catch((err) => {
      type = "ERROR";
      data = err.message;
    });
  // console.log({ data });
  return { type, data };
};

export const getCity = async (city) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6ecf2fe9632179c173dbff234cc83200`;
  let data = {};
  let type = "GET_CITY";
  await axios
    .get(url)
    .then((res) => {
      if (res.data.lenght === 0) {
        throw new Error();
      }
      // console.log(res.data);
      data = { ...res.data };
    })
    .catch((err) => {
      type = "ERROR";
      data = err;
    });
  return { type, data };
};
