import React from "react";
import { Button } from "../components/Button";
import { TumbalsCollection } from "../db/TumbalsCollection";
import { FeaturesCollection } from "../db/FeaturesCollection";
import { PowersCollection } from "../db/PowersCollection";
import { TargetInfo } from "../components/TargetInfo";
import { FloatingAlert } from "../components/FloatingAlert.jsx";
import { getEfek, getIsiKiriman } from "../utils/Utils";

export const SuccessSummary = (props) => {
  const activity = JSON.parse(localStorage.getItem("activity"));
  const [emailAlert, setEmailAlert] = React.useState({
    show: false,
    message: "",
  });

  const getFeatureName = () => {
    const res = FeaturesCollection.findOne({ _id: activity.featureId });
    return res;
  };

  return (
    <div className="container overflow-hidden position-relative min-vh-100">
      <div className="d-flex flex-column">
        <div className="d-flex flex-column align-items-center my-5">
          <h1 className="f-ts mb-4">{getFeatureName()?.title} Sukses</h1>
          <div className="payment-group px-5 mt-5 py-4 w-100">
            {props.type === "santet" || props.type === "pelet" ? (
              <TargetInfo />
            ) : (
              ""
            )}

            <div className="activity-detail mb-5">
              {props.type === "santet" ? (
                <>
                  <p className="fs-6 mb-0 opacity-75">Isi Kiriman</p>
                  <p>
                    {getIsiKiriman(activity?.isi).map((kiriman, idx) =>
                      idx != activity.isi.length - 1
                        ? `${kiriman.title}, `
                        : kiriman.title
                    )}
                  </p>

                  <p className="fs-6 mb-0 opacity-75">Efek</p>
                  <p>
                    {getEfek(activity?.efek).map((efek, idx) =>
                      idx != activity.efek.length - 1
                        ? `${efek.title}, `
                        : efek.title
                    )}
                  </p>
                </>
              ) : props.type === "pelet" ? (
                <>
                  <p className="fs-6 mb-0 opacity-75">Jangka Waktu</p>
                  <p>{activity.jangkaWaktu} Hari</p>

                  <p className="fs-6 mb-0 opacity-75">Otomatis Perbarui</p>
                  <p>{activity.autoRenewal ? "Ya" : "Tidak"}</p>
                </>
              ) : (
                <>
                  <p className="fs-6 mb-0 opacity-75 mt-5">Jangka Waktu</p>
                  <p>{activity.jangkaWaktu} Hari</p>
                  <p className="fs-6 mb-0 opacity-75">Kekuatan Proteksi</p>
                  <p>
                    {
                      PowersCollection.findOne({
                        _id: activity.kekuatanProteksi,
                      })?.title
                    }
                  </p>
                </>
              )}

              <p className="fs-6 mb-0 opacity-75">Metode Penumbalan</p>
              <p>
                {
                  TumbalsCollection.findOne({ _id: activity.paymentMethodId })
                    ?.title
                }
              </p>
            </div>
          </div>
        </div>
        <Button model="primary" text="Kembali" fullSize={true} url="/" />
      </div>
      <FloatingAlert show={emailAlert.show} message={emailAlert.message} />
    </div>
  );
};
