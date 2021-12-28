import React from "react";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { Button } from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { authenticated } from "../store";
import { useRecoilState } from "recoil";

export const Register = () => {
  const [inputState, setInputState] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    birth_day: "",
    password: "",
    repassword: "",
  });
  const [pwdMatch, setPwdMatch] = React.useState(false);
  const karma = 0;
  const navigate = useNavigate();
  const [auth, setAuth] = useRecoilState(authenticated);

  const handleInputState = (e) => {
    setInputState({
      ...inputState,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckPassword = () => {
    return inputState.password === inputState.repassword;
  };

  React.useEffect(() => {
    setPwdMatch(handleCheckPassword());
  }, [inputState.repassword]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    Accounts.createUser(
      {
        email: inputState.email,
        password: inputState.password,
        profile: {
          first_name: inputState.first_name,
          last_name: inputState.last_name,
          birth_day: inputState.birth_day,
          karma,
        },
      },
      (err) => {
        if (err) console.log(err);
        else {
          Meteor.loginWithPassword(
            { email: inputState.email },
            inputState.password,
            (err) => {
              if (err) console.log(err);
              else {
                const user = Meteor.user();
                console.log(user);
                setAuth({ check: true, user });
                navigate("/", { replace: true });
              }
            }
          );
        }
      }
    );
  };

  return (
    <div className="container my-5">
      <p className="d-inline-block text-center w-100 fs-6 f-ts text-red mb-0">
        SantoN
      </p>
      <h1 className="f-ts text-center fs-1 mb-4">Register</h1>
      <form
        onSubmit={(e) => {
          handleSubmitForm(e);
        }}
        encType="multipart/form-data"
        className="w-100"
      >
        <div className="d-flex flex-column">
          <div className="input-group two-input-column my-3 d-flex justify-content-between">
            <div className="d-inline-block me-3 first-double-input">
              <label htmlFor="first-name" className="mb-2 d-block">
                Nama Depan
              </label>
              <input
                type="text"
                id="first-name"
                name="first_name"
                className="p-2 w-100"
                onChange={(e) => {
                  handleInputState(e);
                }}
                required
              />
            </div>

            <div className="d-inline-block">
              <label htmlFor="last-name" className="mb-2 d-block">
                Nama Belakang
              </label>
              <input
                type="text"
                id="last-name"
                name="last_name"
                className="p-2 w-100"
                onChange={(e) => {
                  handleInputState(e);
                }}
                required
              />
            </div>
          </div>

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
          </div>

          <div className="input-group my-3 d-flex flex-column">
            <label htmlFor="birth-day" className="mb-2">
              Tanggal Lahir
            </label>
            <input
              type="date"
              id="birth-day"
              name="birth_day"
              className="p-2 w-100"
              onChange={(e) => {
                handleInputState(e);
              }}
              required
            />
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
          </div>

          <div className="input-group my-3 d-flex flex-column">
            <label htmlFor="repassword" className="mb-2">
              Ulangi Password
            </label>
            <input
              type="password"
              id="repassword"
              name="repassword"
              className="p-2"
              onChange={(e) => {
                handleInputState(e);
              }}
              required
            />
            <small className={`mt-1 text-end ${pwdMatch ? "opacity-0" : ""}`}>
              Password tidak cocok!
            </small>
          </div>

          <Button
            type="submit"
            model="primary"
            text="Register"
            fullSize={true}
            disabled={!pwdMatch}
          />
          <Link to="/login">
            <small className="float-end mt-2 opacity-75">
              Sudah punya akun? Login disini!
            </small>
          </Link>
        </div>
      </form>
    </div>
  );
};
