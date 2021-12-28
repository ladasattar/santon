import React from "react";
import { Meteor } from "meteor/meteor";
import { TumbalsCollection } from "../db/TumbalsCollection";
import { useTracker } from "meteor/react-meteor-data";
import { Button } from "../components/Button";
import { TumbalRadio } from "../components/TumbalRadio";
import { useNavigate } from "react-router-dom";
import { authenticated, floatingAlertPersist } from "../store";
import { useRecoilState } from "recoil";

export const Payment = (props) => {
  const [auth, setAuth] = useRecoilState(authenticated);
  const [floatingAlert, setFloatingAlert] =
    useRecoilState(floatingAlertPersist);
  const tumbals = useTracker(() => {
    return TumbalsCollection.find({}).fetch();
  }, []);
  const activity = JSON.parse(localStorage.getItem("activity"));
  const targetPhoto = JSON.parse(localStorage.getItem("target_photo"));
  const [inputState, setInputState] = React.useState({
    ...activity,
    paymentMethodId: "",
    userId: auth?.user?._id,
  });
  let navigate = useNavigate();

  // Email
  const emailFrom = "Official Santon <official.santon.666@gmail.com>";
  const emailProteksiTo = auth?.user?.services?.google?.email
    ? auth?.user?.services?.google?.email
    : auth?.user?.emails[0]?.address;
  const emailProteksiFullnameTo = auth?.user?.profile?.name
    ? auth?.user?.profile?.name
    : auth?.user?.profile?.first_name + " " + auth?.user?.profile?.last_name;

  const handleSelectedMethod = (e) => {
    setInputState({
      ...activity,
      paymentMethodId: e.target.value,
      userId: auth?.user?._id,
      targetInfo: {
        ...activity.targetInfo,
        target_photo: targetPhoto,
      },
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    localStorage.setItem("activity", JSON.stringify(inputState));
    const oldKarma = Meteor.user().profile.karma
      ? Meteor.user().profile.karma
      : 0;
    const oldProteksi = Meteor.user().profile.jangkaProteksi
      ? Meteor.user().profile.jangkaProteksi
      : 0;

    if (props.for === "santet") {
      await Meteor.call(
        "insertActivitySantet",
        inputState.featureId,
        inputState.targetInfo,
        inputState.isi,
        inputState.efek,
        inputState.paymentMethodId,
        inputState.userId,
        function (error) {
          if (error) console.log("error", error);
          else {
            Meteor.users.update(
              { _id: inputState.userId },
              { $set: { "profile.karma": oldKarma + inputState.karma } },
              {},
              (err) => {
                if (err) console.log(err);
                else {
                  setAuth({
                    ...auth,
                    user: Meteor.user(),
                  });
                }
              }
            );
            if (inputState.targetInfo.target_email) {
              Meteor.call(
                "sendEmail",
                `${inputState.targetInfo.target_name} <${inputState.targetInfo.target_email}>`,
                emailFrom,
                "[PERINGATAN!] Anda telah ditargetkan",
                `${inputState.targetInfo.target_name}, Anda telah ditargetkan praktik santet online, bersiaplah!`,
                (err) => {
                  if (err) console.log(err);
                  else
                    setFloatingAlert({
                      show: true,
                      message: "Email peringatan terkirim!",
                      type: "success",
                    });
                }
              );
            }
            navigate("/santet-online/success", { replace: false });
          }
        }
      );
    } else if (props.for === "pelet") {
      await Meteor.call(
        "insertActivityPelet",
        inputState.featureId,
        inputState.targetInfo,
        inputState.paymentMethodId,
        parseInt(inputState.jangkaWaktu),
        inputState.autoRenewal === "true",
        inputState.userId,
        function (error) {
          if (error) console.log("error", error);
          else {
            Meteor.users.update(
              { _id: inputState.userId },
              { $set: { "profile.karma": oldKarma + inputState.karma } },
              {},
              (err) => {
                if (err) console.log(err);
                else {
                  setAuth({
                    ...auth,
                    user: Meteor.user(),
                  });
                }
              }
            );
            if (inputState.targetInfo.target_email) {
              Meteor.call(
                "sendEmail",
                `${inputState.targetInfo.target_name} <${inputState.targetInfo.target_email}>`,
                emailFrom,
                "[PERINGATAN!] Anda telah ditargetkan",
                `${inputState.targetInfo.target_name}, Anda telah ditargetkan praktik pelet online, bersiaplah!`,
                (err) => {
                  if (err) console.log(err);
                  else
                    setFloatingAlert({
                      show: true,
                      message: "Email peringatan terkirim!",
                      type: "success",
                    });
                }
              );
            }
            navigate("/pelet-online/success", { replace: false });
          }
        }
      );
    } else if (props.for === "proteksi") {
      await Meteor.call(
        "addProteksi",
        inputState.featureId,
        inputState.paymentMethodId,
        parseInt(inputState.jangkaWaktu),
        inputState.kekuatanProteksi,
        inputState.userId,
        function (error) {
          if (error) console.log("error", error);
          else {
            Meteor.users.update(
              { _id: inputState.userId },
              {
                $set: {
                  "profile.jangkaProteksi":
                    oldProteksi + parseInt(inputState.jangkaWaktu),
                  "profile.kekuatanProteksi": inputState.kekuatanProteksi,
                  "profile.karma": oldKarma + inputState.karma,
                },
              },
              {},
              (err) => {
                if (err) console.log(err);
                else {
                  setAuth({
                    ...auth,
                    user: Meteor.user(),
                  });
                  Meteor.call(
                    "sendEmail",
                    `${emailProteksiFullnameTo} <${emailProteksiTo}>`,
                    emailFrom,
                    "Proteksi Anda Berhasil Ditambahkan",
                    `${emailProteksiFullnameTo}, Proteksi anda telah ditambahkan sebanyak ${parseInt(
                      inputState.jangkaWaktu
                    )} hari`,
                    (err) => {
                      if (err) console.log(err);
                      else
                        setFloatingAlert({
                          show: true,
                          message: "Email peringatan terkirim!",
                          type: "success",
                        });
                    }
                  );
                  navigate("/proteksi-online/success", { replace: false });
                }
              }
            );
          }
        }
      );
    }
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
            <h1 className="f-ts mb-4">Metode Penumbalan</h1>
            <div className="payment-group px-5 mt-5 py-4 w-100">
              {tumbals.map((tumbal, idx) => {
                if (idx !== tumbals.length - 1) {
                  return (
                    <div key={tumbal._id}>
                      <TumbalRadio
                        state={tumbal}
                        onChange={(e) => {
                          handleSelectedMethod(e);
                        }}
                      />
                      <hr />
                    </div>
                  );
                } else {
                  return (
                    <div key={tumbal._id}>
                      <TumbalRadio
                        state={tumbal}
                        onChange={(e) => {
                          handleSelectedMethod(e);
                        }}
                      />
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <Button
            type="submit"
            model="primary"
            text="Konfirmasi"
            fullSize={true}
          />
        </div>
      </form>
    </div>
  );
};
