export const Cities = (props) => {
  console.log(props);
  const { styles, cleanup: data, onSelectCityHandler } = props.obj;

  return (
    data && (
      <div className={styles.cities_div}>
        {data.map((city, i) => (
          <div className={styles.cities} key={i} onClick={onSelectCityHandler}>
            {city}
          </div>
        ))}
      </div>
    )
  );
};
// export default Cities
