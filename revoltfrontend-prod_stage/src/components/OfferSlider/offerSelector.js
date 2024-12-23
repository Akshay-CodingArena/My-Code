import { useState, useEffect } from "react";

const OfferSelector = ({ count, current, setCurrentSlideIndex }) => {
  const [selectors, setSelectors] = useState([]);
  useEffect(() => {
    if (count) {
      let i = 0;
      let tempArr = [];
      for (i = 0; i < count; i++) {
        tempArr.push(i);
      }
      setSelectors([...tempArr]);
    }
  }, [count]);
  return (
    <div className="selectorContainer">
      {selectors.map((item) => (
        <div
          className={`offerSelect ${current === item ? "active" : ""}`}
          onClick={() => setCurrentSlideIndex(item)}
        ></div>
      ))}
    </div>
  );
};

export default OfferSelector;
