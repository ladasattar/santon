import React from "react";
import { Link } from "react-router-dom";

export const Button = (button) => {
  if (button.type == "submit") {
    return (
      <button
        className={`${button.model} border-0 f-ts my-3 fs-5 py-3 px-4 ${
          button.fullSize ? "w-100" : "mx-2"
        }`}
        type={button.type}
        disabled={button.disabled}
      >
        {button.text}
      </button>
    );
  } else {
    return (
      <Link to={button.url}>
        <button
          className={`${button.model} border-0 f-ts my-3 fs-5 py-3 px-4 ${
            button.fullSize ? "w-100" : "mx-2"
          }`}
          type={button.type}
          disabled={button.disabled}
          onClick={button.onClick}
        >
          {button.text}
        </button>
      </Link>
    );
  }
};

Button.defaultProps = {
  url: "",
  type: "button",
  disabled: false,
};
