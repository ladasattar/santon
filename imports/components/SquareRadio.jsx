import React from "react";
import $ from "jquery";

export const SquareRadio = (props) => {
  const [checked, setChecked] = React.useState(false);

  const isChecked = (e) => {
    $(".badge-checkbox").removeClass("checked");
    setChecked(e.target.checked);
  };

  return (
    <div
      className={`badge-checkbox py-2 position-relative ${
        checked ? "checked" : ""
      }`}
    >
      <input
        type="radio"
        name={props.name}
        id="kekuatan-proteksi"
        onChange={props.onChange}
        value={props.value}
        className="position-absolute w-100 h-100 start-0 top-0 opacity-0"
        onClick={(e) => isChecked(e)}
      />
      <label htmlFor="kekuatan-proteksi">{props.label}</label>
    </div>
  );
};
