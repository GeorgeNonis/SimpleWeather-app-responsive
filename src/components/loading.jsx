export const IsLoading = ({ loading, styles }) => {
  return loading && <div className={styles["loading-spinner"]}></div>;
};
