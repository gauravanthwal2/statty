import styles from "./PrimaryButton.module.css";

const PrimaryButton = ({ text, ...buttoProps }) => {
  return (
    <button
      className={styles.primaryButton}
      {...buttoProps}
      data-testid="primary"
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
