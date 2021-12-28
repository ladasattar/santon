import React from "react";
import { Button } from "../Button";
import { TargetInfo } from "../TargetInfo";
import { useNavigate } from "react-router-dom";
import { SimpleRadio } from "../SimpleRadio";

export const FormEfekPelet = () => {
  const activity = JSON.parse(localStorage.getItem("activity"));
  const [inputState, setInputState] = React.useState({
    activity,
  });
  const [jangkaWaktu, setJangkaWaktu] = React.useState(1);
  const [autoRenewal, setAutoRenewal] = React.useState(false);
  const [karma, setKarma] = React.useState(0);
  let navigate = useNavigate();

  const handleInputState = (e) => {
    setJangkaWaktu(e.target.value);
    setKarma(Math.round(e.target.value / 5));
  };

  const handleRadioButton = (e) => {
    setAutoRenewal(e.target.value);
  };

  React.useEffect(() => {
    setInputState({
      ...activity,
      autoRenewal,
      jangkaWaktu,
      karma,
    });
  }, [jangkaWaktu, autoRenewal]);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    localStorage.setItem("activity", JSON.stringify(inputState));
    console.log(JSON.parse(localStorage.getItem("activity")));
    navigate("/pelet-online/pilih-tumbal", { replace: false });
  };

  return (
    <div className="container">
      <form
        onSubmit={(e) => {
          handleSubmitForm(e);
        }}
        encType="multipart/form-data"
        className="w-100"
      >
        <div className="d-flex flex-column">
          <div className="d-flex flex-column align-items-center my-5">
            <h1 className="mb-4">Efek Pelet</h1>
            <div className="w-100">
              <TargetInfo />
            </div>
            <div className="input-group my-3 d-flex flex-column">
              <label htmlFor="jangka-waktu" className="mb-2">
                Jangka Waktu
              </label>
              <div className="input-right-span d-flex align-items-center w-100">
                <input
                  type="number"
                  min="1"
                  max="35"
                  id="jangka-waktu"
                  placeholder="Maks. 35 Hari"
                  name="jangka_waktu"
                  className="p-2 me-3"
                  onChange={(e) => {
                    handleInputState(e);
                  }}
                  required
                />
                <span className="mx-2 ms-auto opacity-75">Hari</span>
              </div>
            </div>

            <div className="input-group my-3 d-flex flex-column">
              <label htmlFor="auto-renewal" className="mb-2">
                Auto Renewal
              </label>
              <div className="d-flex">
                <SimpleRadio
                  label="Ya"
                  name="auto_renewal"
                  onChange={(e) => {
                    handleRadioButton(e);
                  }}
                  value={true}
                />
                <SimpleRadio
                  label="Tidak"
                  name="auto_renewal"
                  onChange={(e) => {
                    handleRadioButton(e);
                  }}
                  value={false}
                />
              </div>
            </div>
          </div>
          <Button
            type="submit"
            model="primary"
            text="Pilih Metode Penumbalan"
            fullSize={true}
          />
        </div>
      </form>
    </div>
  );
};
