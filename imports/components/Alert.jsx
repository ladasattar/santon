import React from "react";
import { Meteor } from "meteor/meteor";
import { Button } from "../components/Button.jsx";
import { authenticated, alertPersist } from "../store/index.js";
import { useRecoilValue, useRecoilState } from "recoil";

export const Alert = () => {
  const alertData = useRecoilValue(alertPersist);
  const [auth, setAuth] = useRecoilState(authenticated);
  const [alert, setAlert] = useRecoilState(alertPersist);

  const hideAlert = () => {
    setAlert({
      ...alertData,
      show: false,
    });
  };

  return (
    <div
      className={`alert text-left position-fixed overflow-hidden vh-100 vw-100 top-0 start-0 p-0 ${
        alertData.show ? "" : "hide-alert"
      }`}
    >
      <div
        className="alert-overlay w-100 h-100"
        onClick={() => hideAlert()}
      ></div>
      <div
        className={`alert-box position-fixed bottom-0 start-50 translate-middle-x w-100 px-4  ${
          alertData.show ? "" : "hide-alert"
        }`}
      >
        <p className="f-ts mt-3 mb-4">{alertData.header}</p>
        <p className="opacity-75">{alertData.body}</p>
        <div className="d-flex">
          <div className="w-50 me-3">
            <Button
              type="button"
              model="secondary"
              text="Kembali"
              fullSize={true}
              onClick={() => {
                hideAlert();
              }}
            />
          </div>
          <div className="w-50">
            <Button
              type="button"
              model="primary"
              text={alertData.primaryBtnText}
              fullSize={true}
              onClick={alertData.handleClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
