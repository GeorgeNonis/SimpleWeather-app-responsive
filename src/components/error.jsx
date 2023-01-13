export const Error = ({ error, city, styles }) => {
  return (
    error &&
    city.length > 0 && (
      <div className={styles.error}>
        <h3>{error}</h3>
      </div>
    )
  );
};
