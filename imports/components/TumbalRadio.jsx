import React from "react";

export const TumbalRadio = (props) => {
  return (
    <div className="payment-method mb-4 mt-4" key={props.state._id}>
      <label>
        {props.state.title}
        <p className="opacity-75 mt-1">{props.state.desc}</p>
        <input
          type="radio"
          name="metode_penumbalan"
          onChange={props.onChange}
          id=""
          value={props.state._id}
        />
        <span className="radio-checkmark translate-middle-y"></span>
      </label>
    </div>
  );
};
