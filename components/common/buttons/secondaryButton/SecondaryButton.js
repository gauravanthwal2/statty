import styles from "./SecondaryButton.module.css";

const SecondaryButton = ({ text, ...buttoProps }) => {
  return (
    <button
      className={styles.secondaryButton}
      {...buttoProps}
      data-testid="secondary"
    >
      {text}
    </button>
  );
};

export default SecondaryButton;
