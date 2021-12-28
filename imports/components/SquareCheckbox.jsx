import React from "react";

export const SquareCheckbox = (props) => {
  const [checked, setChecked] = React.useState(false);

  const isChecked = (e) => {
    setChecked(e.target.checked);
  };

  return (
    <div
      className={`badge-checkbox py-2 position-relative ${
        checked ? "checked" : ""
      }`}
    >
      <input
        type="checkbox"
        name={`${props.name}[]`}
        id="isi-kiriman"
        onChange={props.onChange}
        value={props.value}
        className="position-absolute w-100 h-100 start-0 top-0 opacity-0"
        onClick={(e) => isChecked(e)}
        alt={props.karma}
      />
      <label htmlFor="isi-kiriman">{props.title}</label>
    </div>
  );
};
