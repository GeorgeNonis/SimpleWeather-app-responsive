export const Error = ({ error, city, styles }) => {
  return (
    error &&
    city.length > 0 && (
      <div className={styles.error}>
        <h3>Cant find {city} in the database</h3>
      </div>
    )
  );
};
