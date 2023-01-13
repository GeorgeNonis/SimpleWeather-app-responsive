export const onKeyPress = (e, setCity, fetchData) => {
  if (e.key !== "Enter") return;

  setCity(e.target.value);
  fetchData(e.target.value);
};

export const onSelectCityHandler = (e, fetchCity) => {
  let city = e.target.innerHTML.split(",")[0];
  if (city.split(" ").length > 1) {
    city = city.split(" ").join("&");
  }
  console.log({ city });
  fetchCity(city);
};

//  Just testing
