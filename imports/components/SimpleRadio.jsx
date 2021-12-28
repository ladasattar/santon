import React from "react";

export const SimpleRadio = (props) => {
  return (
    <div className="payment-method simple-radio mb-4 mt-4">
      <label>
        <input
          type="radio"
          name={props.name}
          onChange={props.onChange}
          value={props.value}
        />
        <span className="radio-checkmark translate-middle-y"></span>
        <span style={{ marginLeft: "35px" }}>{props.label}</span>
      </label>
    </div>
  );
};
