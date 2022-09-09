import React, { forwardRef } from "react";
import styles from "./Modal.module.css";
import { GrClose } from "react-icons/gr";

const Modal = forwardRef((props, ref) => {
  const closeModal = () => {
    ref.current.close();
  };
  return (
    <dialog ref={ref} {...props} className={styles.modal}>
      <div className={styles.nonMovable}>
        <button onClick={closeModal} className={styles.closeModal}>
          <GrClose />
        </button>
      </div>
      <hr />
      <div className={styles.modalBody}>{props.children}</div>
    </dialog>
  );
});

// Modal.displayName = "Modal";

export default Modal;
