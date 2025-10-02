import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.overlay}>
      <div className={css.spinner}></div>
    </div>
  );
};

export default Loader;