import React from "react";
import { useNavigate } from "react-router-dom";
import { FormPelet } from "../components/forms/FormPelet";
import { FormProteksi } from "../components/forms/FormProteksi";
import { FormSantet } from "../components/forms/FormSantet";

export const TargetForm = (props) => {
  let navigate = useNavigate();

  return (
    <div className="container d-flex flex-column align-items-center my-4 position-relative">
      <img
        src="/assets/icons/arrow-left.svg"
        className="fa fa-arrow-left position-absolute fs-4 back-icon"
        style={{ left: "12px" }}
        onClick={() => navigate(-1)}
      />
      <h1 className="f-ts mb-4 mt-5">
        {props.type !== "proteksi" ? "Informasi Target" : "Proteksi Online"}
      </h1>
      {props.type == "santet" ? (
        <FormSantet />
      ) : props.type == "pelet" ? (
        <FormPelet />
      ) : (
        <FormProteksi />
      )}
    </div>
  );
};
