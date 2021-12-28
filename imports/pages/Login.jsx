import React from "react";
import { Meteor } from "meteor/meteor";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { authenticated } from "../store";
import { useRecoilState } from "recoil";

export const Login = () => {
  const [inputState, setInputState] = React.useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = React.useState({
    for: "",
    text: "",
  });
  const [auth, setAuth] = useRecoilState(authenticated);

  let navigate = useNavigate();
  const handleInputState = (e) => {
    setInputState({
      ...inputState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    Meteor.loginWithPassword(
      { email: inputState.email },
      inputState.password,
      (err) => {
        if (err) {
          console.log(err);
          if (err.reason === "User not found")
            setMessage({ for: "email", text: err.reason });
          if (err.reason === "Incorrect password")
            setMessage({ for: "password", text: err.reason });
        } else {
          const user = Meteor.user();
          setAuth({ check: true, user });
          navigate("/", { replace: true });
        }
      }
    );
  };

  return (
    <div className="container d-flex flex-column align-items-center my-5">
      <p className="d-inline fs-6 f-ts text-red mb-0">SantoN</p>
      <h1 className="f-ts mb-4">Login</h1>
      <form
        onSubmit={(e) => {
          handleSubmitForm(e);
        }}
        encType="multipart/form-data"
        className="w-100"
      >
        <div className="d-flex flex-column">
          <div className="input-group my-3 d-flex flex-column">
            <label htmlFor="email" className="mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="p-2"
              onChange={(e) => {
                handleInputState(e);
              }}
              required
            />
            <div className="text-message">
              <small className="mt-1 text-red float-end">
                {message.for === "email" ? message.text : ""}
              </small>
            </div>
          </div>

          <div className="input-group my-3 d-flex flex-column">
            <label htmlFor="password" className="mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="p-2"
              onChange={(e) => {
                handleInputState(e);
              }}
              required
            />
            <div className="text-message">
              <small className="mt-1 text-red float-end">
                {message.for === "password" ? message.text : ""}
              </small>
            </div>
          </div>
          <Button type="submit" model="primary" text="Login" fullSize={true} />
          <Link to="/register">
            <small className="float-end mt-2 opacity-75">
              Belum punya akun? Register disini!
            </small>
          </Link>
        </div>
      </form>
      <div className="mt-5 w-100">
        <Button
          type="button"
          model="secondary"
          text="Login dengan Google"
          fullSize={true}
          onClick={() => {
            Meteor.loginWithGoogle({}, (err) => {
              if (err) console.log("Error service config", err);
              else {
                const user = Meteor.user();
                setAuth({ check: true, user });
                navigate("/", { replace: true });
              }
            });
          }}
        />
      </div>
    </div>
  );
};
