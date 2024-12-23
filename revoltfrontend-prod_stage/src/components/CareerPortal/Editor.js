import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default React.forwardRef(function Editor(props, ref) {
  const [value, setValue] = useState(props.value);
  if (props.value && !value) {
    setValue(props.value);
  }
  return (
    <div className="quill-box">
      <ReactQuill
        ref={ref}
        theme="snow"
        value={value}
        onChange={(value) => setValue(value)}
      />
    </div>
  );
});
