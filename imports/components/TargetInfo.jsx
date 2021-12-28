import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { DaysCollection } from "../db/DaysCollection";
import { WetonsCollection } from "../db/WetonsCollection";
import { getFullDate } from "../utils/Utils";

export const TargetInfo = () => {
  const activity = JSON.parse(localStorage.getItem("activity"));
  const targetPhoto = JSON.parse(localStorage.getItem("target_photo"));

  const weton_day = useTracker(() => {
    return DaysCollection.find({
      _id: new Mongo.ObjectID(activity.targetInfo.weton_hari),
    }).fetch();
  }, []);

  const weton_pasaran = useTracker(() => {
    return WetonsCollection.find({
      _id: new Mongo.ObjectID(activity.targetInfo.weton_pasaran),
    }).fetch();
  }, []);

  const getFullWeton = () => {
    return weton_day[0]?.day + " " + weton_pasaran[0]?.pasaran;
  };

  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  return (
    <div className="input-group my-5 d-flex align-items-center">
      <div className="file-upload position-relative overflow-hidden">
        <img
          src={
            targetPhoto
              ? targetPhoto
              : "https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg"
          }
          className="h-100 w-100"
          alt="..."
        />
      </div>
      <div className="target-info ms-3">
        <p className="target-name fs-5 mb-0">
          {activity.targetInfo.target_name}
        </p>
        <p className="fs-6 opacity-75 my-0">
          {getFullDate(activity.targetInfo.target_birthd)}
        </p>
        <p className="fs-6 my-0 badge-weton py-1 px-2 rounded mt-3">
          {getFullWeton()}
        </p>
      </div>
    </div>
  );
};
