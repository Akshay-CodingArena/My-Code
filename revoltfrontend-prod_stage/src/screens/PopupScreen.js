import React, { useState, useEffect } from "react";

const DelayedPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isOpen && (
        <div className="popupContainer">
          <button className="closeButton" onClick={() => setIsOpen(false)}>
            X
          </button>

          <a
            href="https://www.facebook.com/share/v/1Qaw28tvUH/?mibextid=WC7FNe"
            target="_blank"
          >
            <img src="/images/launch-lanka.png" />
          </a>
        </div>
      )}
    </div>
  );
};

export default DelayedPopup;
