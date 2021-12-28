import React from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { floatingAlertPersist } from "../store";

export const FloatingAlert = () => {
  const floatingAlertData = useRecoilValue(floatingAlertPersist);
  const [floatingAlert, setFloatingAlert] =
    useRecoilState(floatingAlertPersist);

  const hideAlert = () => {
    if (floatingAlertData.show) {
      setTimeout(() => {
        setFloatingAlert({
          show: false,
          message: "",
          type: "success",
        });
      }, 3000);
    }
  };

  React.useEffect(() => {
    hideAlert();
  }, [floatingAlert]);

  return (
    <div
      className={`floating-alert position-fixed w-100 px-3 translate-middle start-50 bottom-0 ${
        floatingAlertData.show ? "" : "hide"
      }`}
    >
      <div
        className="body p-3 fs-6"
        style={{
          background: floatingAlert.type === "success" ? "#0FB76B" : "#990101",
        }}
      >
        <p className="mb-0">{floatingAlertData.message}</p>
      </div>
    </div>
  );
};
