import React from "react";
import { IsiKirimansCollection } from "../../db/IsiKirimansCollection";
import { EfeksCollection } from "../../db/EfeksCollection";
import { useTracker } from "meteor/react-meteor-data";
import { SquareCheckbox } from "../SquareCheckbox";
import { Button } from "../Button";
import { TargetInfo } from "../TargetInfo";
import { useNavigate } from "react-router-dom";

export const FormIsiKiriman = () => {
  const isiKirimans = useTracker(() => IsiKirimansCollection.find({}).fetch());
  const efeks = useTracker(() => EfeksCollection.find({}).fetch());
  const activity = JSON.parse(localStorage.getItem("activity"));
  const [inputState, setInputState] = React.useState({
    activity,
  });
  const [selectedIsi, setSelectedIsi] = React.useState([]);
  const [selectedEfek, setSelectedEfek] = React.useState([]);
  const [karma, setKarma] = React.useState(0);
  let navigate = useNavigate();

  const handleSelectInput = (e) => {
    if (e.target.name === "isi_kiriman[]" && e.target.checked) {
      setSelectedIsi([...selectedIsi, e.target.value]);
    } else if (e.target.name === "isi_kiriman[]" && !e.target.checked) {
      const copyIsi = [...selectedIsi];
      const idx = copyIsi.indexOf(e.target.value);
      if (idx !== -1) {
        copyIsi.splice(idx, 1);
        setSelectedIsi(copyIsi);
      }
    }

    if (e.target.name === "efek[]" && e.target.checked)
      setSelectedEfek([...selectedEfek, e.target.value]);
    else if (e.target.name === "efek[]" && !e.target.checked) {
      const copyEfek = [...selectedEfek];
      const idx = copyEfek.indexOf(e.target.value);
      if (idx !== -1) {
        copyEfek.splice(idx, 1);
        setSelectedEfek(copyEfek);
      }
    }

    // Increment Karma
    setKarma(karma + parseFloat(e.target.alt));
  };

  React.useEffect(() => {
    setInputState({
      ...activity,
      isi: selectedIsi,
      efek: selectedEfek,
      karma,
    });
  }, [selectedIsi, selectedEfek]);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    localStorage.setItem("activity", JSON.stringify(inputState));
    navigate("/santet-online/pilih-tumbal", { replace: false });
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
            <h1 className="f-ts mb-4">Isi & Efek Santet</h1>
            <div className="w-100">
              <TargetInfo />
              <p className="mb-2 text-left">Isi Kiriman</p>
              <div className="checkbox-group w-100">
                {isiKirimans.map((isi) => (
                  <SquareCheckbox
                    key={isi._id}
                    title={isi.title}
                    name="isi_kiriman"
                    onChange={(e) => handleSelectInput(e)}
                    value={isi._id}
                    karma={isi.karma}
                  />
                ))}
              </div>
            </div>
            <div className="w-100 my-5">
              <p className="mb-2 text-left">Efek</p>
              <div className="checkbox-group w-100">
                {efeks.map((efek) => (
                  <SquareCheckbox
                    key={efek._id}
                    title={efek.title}
                    name="efek"
                    onChange={(e) => handleSelectInput(e)}
                    value={efek._id}
                    karma={efek.karma}
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
