import React from "react";
import { ActivitiesCollection } from "../db/ActivitiesCollection";
import { FeaturesCollection } from "../db/FeaturesCollection";
import { TumbalsCollection } from "../db/TumbalsCollection";
import { useTracker } from "meteor/react-meteor-data";
import { alertPersist, authenticated, floatingAlertPersist } from "../store";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { getFullDate } from "../utils/Utils";
import { Alert } from "../components/Alert";
import { FloatingAlert } from "../components/FloatingAlert";
import { Meteor } from "meteor/meteor";

export const Activity = () => {
  const [auth, setAuth] = useRecoilState(authenticated);
  const [alert, setAlert] = useRecoilState(alertPersist);
  const [floatingAlert, setFloatingAlert] =
    useRecoilState(floatingAlertPersist);
  const [popupMenu, setPopupMenu] = React.useState({
    show: false,
    idx: null,
  });
  const userId = auth?.user?._id;
  const activities = useTracker(() =>
    ActivitiesCollection.find({ userId }, { sort: { createdAt: -1 } }).fetch()
  );
  const navigate = useNavigate();

  const getFeatureName = (featureId) => {
    const res = FeaturesCollection.findOne({ _id: featureId });
    return res;
  };

  const deleteActivity = (_id) => {
    Meteor.call("removeActivity", _id, (err) => {
      if (err) {
        console.log(err);
        setFloatingAlert({
          show: true,
          message: err,
          type: "error",
        });
      } else {
        setAlert({
          show: false,
          header: "",
          body: "",
          primaryBtnText: "",
          handleClick: () => {},
        });

        setFloatingAlert({
          show: true,
          message: "Aktifitas berhasil dihapus",
          type: "success",
        });

        setPopupMenu({
          show: false,
          idx: null,
        });
      }
    });
  };

  const handleDeleteActivity = (e, idx) => {
    const _id = e.target.id;
    setAlert({
      show: true,
      header: "Hapus Aktifitas",
      body: "Apakah anda yakin menghapus aktifitas ini?",
      primaryBtnText: "Hapus",
      handleClick: () => deleteActivity(_id),
    });
  };

  return (
    <div className="min-vh-100 overflow-hidden">
      <FloatingAlert />
      <div className="container d-flex flex-column align-items-center position-relative my-4 min-vh-100">
        <img
          src="/assets/icons/arrow-left.svg"
          className="fa fa-arrow-left position-absolute fs-4 back-icon top-0"
          style={{ left: "12px" }}
          onClick={() => navigate(-1)}
        />
        <h1 className="f-ts mb-4 mt-5">Aktifitas Praktik</h1>
        <div className="feature-wrapper row w-100">
          {activities.length === 0 ? (
            <h5 className="text-center fw-light opacity-50 position-absolute top-50 start-50 translate-middle">
              Belum ada aktifitas
            </h5>
          ) : (
            activities.map((activity, idx) => {
              return (
                <div
                  className="activity-container w-100 my-2 pt-3 pb-4 px-3"
                  key={activity._id}
                >
                  <div className="mb-2 d-flex justify-content-between align-items-center">
                    <div>
                      <p className="activity-title f-ts">
                        {getFeatureName(activity.feature_id)?.title}
                      </p>
                      <p className="activity-date opacity-75 mb-0 fw-light">
                        {getFullDate(
                          JSON.stringify(activity.createdAt).slice(1, 11)
                        )}
                      </p>
                    </div>
                    <div className="d-flex align-items-center position-relative">
                      <small className="badge-status badge-weton px-1 rounded fw-bold">
                        Sukses
                      </small>
                      <div
                        className="dot-icon ms-3"
                        onClick={() => setPopupMenu({ show: true, idx })}
                      >
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                      </div>
                      <div
                        className={`popup-menu-activity position-absolute ${
                          popupMenu.show && popupMenu.idx === idx ? "" : "hide"
                        }`}
                      >
                        <div
                          className="mb-0 px-3 py-2"
                          onClick={(e) => handleDeleteActivity(e, idx)}
                          id={activity._id}
                        >
                          Hapus aktifitas
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="mt-0" />
                  <div className="activity-thumbnail d-flex">
                    <div className="activity-thumbnail-img overflow-hidden me-3">
                      <img
                        src={
                          activity?.target_info?.target_photo
                            ? activity.target_info.target_photo
                            : "https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg"
                        }
                        className="h-100 w-100"
                        alt=""
                      />
                    </div>
                    <div className="activity-thumbnail-text d-flex flex-column">
                      <p className="mb-0 fw-bold lh-1">
                        {activity?.target_info?.target_name
                          ? activity?.target_info?.target_name
                          : "+" + activity?.jangka_waktu + " Hari Proteksi"}
                      </p>
                      <div className="mt-auto">
                        <p className="activity-penumbalan opacity-75 fw-light">
                          Penumbalan
                        </p>
                        <p className="activity-date mb-0 fw-bold lh-1">
                          {
                            TumbalsCollection.findOne({
                              _id: activity.payment_method_id,
                            })?.title
                          }
                        </p>
                      </div>
                      {/* <p className="fs-6 opacity-75 fw-light">
                    {getFullDate(
                      JSON.stringify(activity.createdAt).slice(1, 11)
                    ) +
                      " " +
                      JSON.stringify(activity.createdAt).slice(12, 20)}
                  </p> */}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <Alert />
    </div>
  );
};
