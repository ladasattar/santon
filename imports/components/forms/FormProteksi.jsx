import React from "react";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";
import { PowersCollection } from "../../db/PowersCollection";
import { useTracker } from "meteor/react-meteor-data";
import { SquareRadio } from "../SquareRadio";

export const FormProteksi = () => {
  const activity = JSON.parse(localStorage.getItem("activity"));
  const powers = useTracker(() => {
    return PowersCollection.find({}).fetch();
  }, []);
  const [inputState, setInputState] = React.useState({
    activity,
  });
  const [jangkaWaktu, setJangkaWaktu] = React.useState(1);
  const [kekuatanProteksi, setKekuatanProteksi] = React.useState("");
  const [karma, setKarma] = React.useState(0);
  let navigate = useNavigate();

  const handleInputState = (e) => {
    setJangkaWaktu(e.target.value);
    setKarma(Math.round(e.target.value / 5));
  };

  const handleRadioButton = (e) => {
    setKekuatanProteksi(e.target.value);
  };

  React.useEffect(() => {
    setInputState({
      ...activity,
      kekuatanProteksi,
      jangkaWaktu,
      karma,
    });
  }, [jangkaWaktu, kekuatanProteksi]);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    localStorage.setItem("activity", JSON.stringify(inputState));
    // console.log(JSON.parse(localStorage.getItem("activity")));
    navigate("/proteksi-online/pilih-tumbal", { replace: false });
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
              <label htmlFor="kekuatan" className="mb-2">
                Kekuatan
              </label>
              <div className="checkbox-group w-100">
                {powers.map((power) => (
                  <SquareRadio
                    label={power.title}
                    name="kekuatan_proteksi"
                    onChange={(e) => {
                      handleRadioButton(e);
                    }}
                    value={power._id}
                    key={power._id}
                  />
                ))}
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
