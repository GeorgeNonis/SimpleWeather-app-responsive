export const Error = ({ error, city, styles }) => {
  return (
    error && (
      <div className={styles.error}>
        <h3>{error}</h3>
      </div>
    )
  );
};
