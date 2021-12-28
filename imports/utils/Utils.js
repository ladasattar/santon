import React from "react";
import { IsiKirimansCollection } from "../db/IsiKirimansCollection";
import { EfeksCollection } from "../db/EfeksCollection";

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

export const getFullDate = (fullDate) => {
  const year = fullDate.slice(0, 4);
  const date = fullDate.slice(8);
  let month = "";
  months.map((text, idx) => {
    if (idx === parseInt(fullDate.slice(5, 7)) - 1) month = text;
  });
  return date + " " + month + " " + year;
};

export const getIsiKiriman = (arrId) => {
  const res = IsiKirimansCollection.find({
    _id: { $in: arrId },
  }).fetch();
  return res;
};

export const getEfek = (arrId) => {
  const res = EfeksCollection.find({
    _id: { $in: arrId },
  }).fetch();
  return res;
};
