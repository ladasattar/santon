import React from "react";
import { useNavigate } from "react-router-dom";
import { DaysCollection } from "../../db/DaysCollection";
import { WetonsCollection } from "../../db/WetonsCollection";
import { useTracker } from "meteor/react-meteor-data";
import { Button } from "../Button";

export const FormPelet = () => {
  const days = useTracker(() => DaysCollection.find({}).fetch());
  const wetons = useTracker(() => WetonsCollection.find({}).fetch());
  const [imgUrl, setImgUrl] = React.useState(null);
  const activity = JSON.parse(localStorage.getItem("activity"));
  const [inputState, setInputState] = React.useState({
    featureId: activity.featureId,
    targetInfo: {
      target_name: "",
      target_birthd: "",
      weton_hari: "",
      weton_pasaran: "",
    },
  });

  useTracker(() => {
    const responHari = DaysCollection.find({}, { limit: 1 }).fetch();
    const responPasaran = WetonsCollection.find({}, { limit: 1 }).fetch();
    setInputState({
      ...inputState,
      targetInfo: {
        weton_hari: responHari[0]?._id._str,
        weton_pasaran: responPasaran[0]?._id._str,
      },
    });
  }, []);

  let navigate = useNavigate();

  const handleChangeImage = (e) => {
    setImgUrl(URL.createObjectURL(e.target.files[0]));
    getBase64(e.target.files[0], (res) => {
      localStorage.setItem("target_photo", JSON.stringify(res));
    });
  };

  const handleInputState = (e) => {
    setInputState({
      ...inputState,
      targetInfo: {
        ...inputState.targetInfo,
        [e.target.name]: e.target.value,
      },
    });
  };

  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    localStorage.setItem("activity", JSON.stringify(inputState));
    navigate("./efek", { replace: false });
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmitForm(e);
      }}
      encType="multipart/form-data"
      className="w-100"
    >
      <div className="d-flex flex-column">
        <div className="input-group my-3 d-flex flex-column align-items-center">
          <div className="file-upload position-relative overflow-hidden">
            <img
              src={
                imgUrl
                  ? imgUrl
                  : "https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg"
              }
              className="position-absolute h-100 w-100"
              alt="..."
            />
            <input
              type="file"
              id="target-photo"
              name="target_photo"
              accept="image/*"
              className="position-absolute opacity-0 h-100 w-100"
              onChange={(e) => handleChangeImage(e)}
            />
            <p
              className={`position-absolute fw-bolder text-center ${
                imgUrl ? "opacity-0" : ""
              }`}
            >
              Klik untuk pilih foto
            </p>
          </div>
          <label htmlFor="target-photo" className="mt-2">
            Foto
          </label>
        </div>

        <div className="input-group my-3 d-flex flex-column">
          <label htmlFor="target-name" className="mb-2">
            Nama
          </label>
          <input
            type="text"
            id="target-name"
            name="target_name"
            className="p-2"
            onChange={(e) => {
              handleInputState(e);
            }}
            required
          />
        </div>

        <div className="input-group my-3 d-flex flex-column">
          <label htmlFor="target-birthd" className="mb-2">
            Tanggal Lahir
          </label>
          <input
            type="date"
            id="target-birthd"
            name="target_birthd"
            className="p-2 w-100"
            onChange={(e) => {
              handleInputState(e);
            }}
            required
          />
        </div>

        <div className="input-group my-3 d-flex flex-column">
          <label htmlFor="weton" className="mb-2">
            Weton
          </label>
          <div className="select-group d-flex">
            <select
              name="weton_hari"
              id="weton"
              className="p-2 w-50 me-3"
              onChange={(e) => {
                handleInputState(e);
              }}
              required
            >
              {days.map((day) => {
                return (
                  <option key={day._id} value={day._id}>
                    {day.day}
                  </option>
                );
              })}
            </select>
            <select
              name="weton_pasaran"
              id="weton"
              className="p-2 w-50"
              onChange={(e) => {
                handleInputState(e);
              }}
              required
            >
              {wetons.map((weton, idx) => {
                return (
                  <option key={weton._id} value={weton._id}>
                    {weton.pasaran}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="input-group my-3 d-flex flex-column">
          <label htmlFor="target-email" className="mb-2">
            Email
          </label>
          <input
            type="email"
            id="target-email"
            name="target_email"
            className="p-2"
            onChange={(e) => {
              handleInputState(e);
            }}
          />
          <small className="opacity-50 fw-light sub-label">
            (Jika diisi, target akan menerima email peringatan)
          </small>
        </div>

        <Button
          type="submit"
          model="primary"
          text="Pilih Efek"
          fullSize={true}
        />
      </div>
    </form>
  );
};
