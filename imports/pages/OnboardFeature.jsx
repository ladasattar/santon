import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export const OnboardFeature = () => {
  const location = useLocation();
  const featureState = location.state;
  const [featureId] = React.useState({ featureId: featureState?._id });
  localStorage.setItem("activity", JSON.stringify(featureId));

  return (
    <div
      className="onboard-bg vh-100 vw-100 position-relative d-flex flex-column align-items-center justify-content-center"
      style={{
        backgroundImage: `url(assets/img/${featureState.img})`,
      }}
    >
      <div className="overlay vw-100 vh-100 position-absolute start-0 top-0"></div>
      <div className="onboard-text text-center">
        <h1 className="f-ts mb-4">{featureState.title}</h1>
        <p>{featureState.desc}</p>
        <div className="btn-group my-3">
          <Button url="/" model="secondary" text="Tidak, Kembali" />
          <Button url="./targeting" model="primary" text="Ya, Saya yakin" />
        </div>
      </div>
    </div>
  );
};
