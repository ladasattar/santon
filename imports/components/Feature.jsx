import React from "react";
import { Link } from "react-router-dom";

export const Feature = ({ feature, isDisabled }) => {
  return (
    <Link
      to={isDisabled ? "#" : feature.url}
      state={{
        _id: feature._id,
        title: feature.title,
        img: feature.img,
        desc: feature.desc,
      }}
      className="feature-card overflow-hidden position-relative mx-2 my-2"
      style={{
        backgroundImage: `url(assets/img/${feature.img})`,
        filter: isDisabled ? "grayscale(100%)" : "none",
      }}
    >
      <p className="feature-title px-4 pt-4 position-relative">
        {feature.title}
      </p>
    </Link>
  );
};
