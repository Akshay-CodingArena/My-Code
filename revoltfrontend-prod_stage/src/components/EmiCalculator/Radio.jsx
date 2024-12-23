import React from "react";

const Radio = (props) => {
  const { label, value, groupValue, onClick, showPercentage } = props;
  return (
    <React.Fragment>
      <div onClick={onClick} className="form-check form-check-inline radioBtn">
        <input
          className="form-check-input"
          type="radio"
          value={value}
          checked={groupValue === value}
        />
        <label className="form-check-label" htmlFor={label}>
          {props.showName ? (
            <div>
              <p>{props.name.toUpperCase()}</p>
              <p style={{ textAlign: "center" }}>
                {label + (showPercentage === false ? "" : "%")}
              </p>
            </div>
          ) : (
            label + (showPercentage === false ? "" : "%")
          )}
        </label>
      </div>
    </React.Fragment>
  );
};
export default Radio;
