import { Meteor } from "meteor/meteor";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { authenticated, alertPersist } from "../store";
import { useRecoilState } from "recoil";

export const Header = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useRecoilState(authenticated);
  const [alert, setAlert] = useRecoilState(alertPersist);

  const logout = () => {
    Meteor.logout((err) => {
      if (err) console.log(err);
      else {
        setAuth({ check: false, user: [] });
        setAlert({
          show: false,
          header: "",
          body: "",
        });
      }
    });
  };

  const handleLogout = () => {
    setAlert({
      show: true,
      header: "Logout",
      body: "Apakah anda yakin mau keluar?",
      primaryBtnText: "Logout",
      handleClick: () => logout(),
    });
  };

  return (
    <div className="header position-relative d-flex align-items-center py-3">
      <h1 className="header-logo d-inline fs-3 mb-0">SantoN</h1>
      <div className="right-nav position-absolute end-0 fs-4 d-flex align-items-center">
        <Link to="/activity" className="me-3">
          <img src="/assets/icons/history.svg" alt="history" />
        </Link>
        <img
          src="/assets/icons/logout.svg"
          onClick={() => handleLogout()}
        ></img>
      </div>
    </div>
  );
};
