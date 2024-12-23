import React, { useState } from "react";

const Test = () => {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count - 1);
  };
  return (
    <div id="mkccc" style={{ display: "flex", justifyContent: "center" }}>
      <h1>Helllo</h1>
      <h2>{count}</h2>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
    </div>
  );
};

export default Test;
