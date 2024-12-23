import React from "react";
import styles from "./Feedback.module.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      <div className={styles.image + " " + styles.modalContent}>
        <div className={styles.closebtn} onClick={onClose}>
          <i className="fa fa-times"></i>
        </div>
        <div className={styles.feedback_table}>{children}</div>
      </div>
    </div>
  );
};
export default Modal;
