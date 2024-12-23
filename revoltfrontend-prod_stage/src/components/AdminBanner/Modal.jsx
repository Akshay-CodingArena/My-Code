import React, { forwardRef, useEffect, useState } from "react";
import * as style from "./admin-banner.module.css";

const Modal = forwardRef(
  (
    {
      children,
      setModalState,
      background,
      setErrors,
      setTempImages,
      setUploadFiles,
      setNewPositionRef,
      setNewLink,
      setImageDropped,
      errors,
    },
    ref,
  ) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      setVisible(true);
    }, []);

    const handleClose = () => {
      setVisible(false);
      setTimeout(() => {
        setModalState({ status: false, index: null });
        setNewLink("");
        if (errors) {
          setErrors({ desktop: "", mobile: "", submit: "" });
          setTempImages({ desktop: "", mobile: "" });
          setUploadFiles({ mobile: "", desktop: "" });
          setNewPositionRef(null);
          setImageDropped({ mobile: false, desktop: false });
        }
      }, 300);
    };

    return (
      <div
        className={`${style.modal_overlay} ${visible ? style.visible : ""}`}
        onClick={handleClose}
      >
        <div
          style={{ background: background ?? "white" }}
          className={`${style.modal_content} ${visible ? style.visible : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
          <div className={style.closebtn}>
            <i ref={ref} className="fa fa-times" onClick={handleClose}>
              {" "}
            </i>
          </div>
        </div>
      </div>
    );
  },
);

export default Modal;
