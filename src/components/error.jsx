export const Error = ({ error, city, styles }) => {
  return (
    error &&
    city.length > 0 && (
      <h3 className={styles.error}>Cant find {city} in the database</h3>
    )
  );
};
