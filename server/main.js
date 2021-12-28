import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { FeaturesCollection } from "/imports/db/FeaturesCollection";
import { DaysCollection } from "/imports/db/DaysCollection";
import { WetonsCollection } from "/imports/db/WetonsCollection";
import { ActivitiesCollection } from "/imports/db/ActivitiesCollection";
import { TumbalsCollection } from "/imports/db/TumbalsCollection";
import { IsiKirimansCollection } from "/imports/db/IsiKirimansCollection";
import { EfeksCollection } from "/imports/db/EfeksCollection";
import { PowersCollection } from "/imports/db/PowersCollection";
// import { UsersCollection } from "/imports/db/UsersCollection";
import { ServiceConfiguration } from "meteor/service-configuration";
import "/imports/api/methods";

const insertFeatures = ({ title, url }) =>
  FeaturesCollection.insert({ title, url });

const insertIsiKirimans = ({ title }) =>
  IsiKirimansCollection.insert({ title, createdAt: new Date() });

const insertEfeks = ({ title }) =>
  EfeksCollection.insert({ title, createdAt: new Date() });

const insertTumbals = ({ title, desc }) =>
  TumbalsCollection.insert({ title, desc, createdAt: new Date() });

const insertPowers = ({ title }) =>
  PowersCollection.insert({ title, createdAt: new Date() });

const SEED_EMAIL = "admin@santon.com";
const SEED_PASSWORD = "12345678";

ServiceConfiguration.configurations.upsert(
  { service: "google" },
  {
    $set: {
      loginStyle: "popup",
      clientId:
        "497302782734-fs3jndb43e2fnoqg97n3sm7961fph5j9.apps.googleusercontent.com", // See table below for correct property name!
      secret: "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",
    },
  }
);

Meteor.startup(() => {
  process.env.MAIL_URL =
    "smtps://official.santon.666%40gmail.com:officialsanton123@smtp.gmail.com:465/";

  if (!Accounts.findUserByEmail(SEED_EMAIL)) {
    Accounts.createUser({
      email: SEED_EMAIL,
      password: SEED_PASSWORD,
    });
  }

  if (FeaturesCollection.find().count() === 0) {
    insertFeatures({
      title: "Santet Online",
      url: "./",
      img: "feature-santet.jpg",
    });

    insertFeatures({
      title: "Pelet Online",
      url: "./",
      img: "feature-pelet.jpg",
    });

    insertFeatures({
      title: "Proteksi Online",
      url: "./",
      img: "feature-proteksi.jpg",
    });
  }

  if (IsiKirimansCollection.find().count() === 0) {
    insertIsiKirimans({
      title: "Paku",
    });

    insertIsiKirimans({
      title: "Silet",
    });

    insertIsiKirimans({
      title: "Kaca",
    });

    insertIsiKirimans({
      title: "Kawat",
    });

    insertIsiKirimans({
      title: "Racun",
    });
  }

  if (EfeksCollection.find().count() === 0) {
    insertEfeks({
      title: "Demam",
    });

    insertEfeks({
      title: "Mual",
    });

    insertEfeks({
      title: "Bengkak",
    });

    insertEfeks({
      title: "Kembung",
    });

    insertEfeks({
      title: "Mati",
    });
  }

  if (TumbalsCollection.find().count() === 0) {
    insertTumbals({
      title: "Uang",
      desc: "Nominal uang ditentukan secara sepihak oleh pihak santon",
    });

    insertTumbals({
      title: "Wanita Muda",
      desc: "Ini deskripsi tumbal yang mau dipakai",
    });

    insertTumbals({
      title: "Anak",
      desc: "Ini deskripsi tumbal yang mau dipakai",
    });

    insertTumbals({
      title: "Tumbal Proyek",
      desc: "Ini deskripsi tumbal yang mau dipakai",
    });

    insertTumbals({
      title: "Pusaka",
      desc: "Ini deskripsi tumbal yang mau dipakai",
    });

    insertTumbals({
      title: "Pring/Bambu Petuk",
      desc: "Ini deskripsi tumbal yang mau dipakai",
    });
  }

  if (PowersCollection.find().count() === 0) {
    insertPowers({
      title: "Standard",
    });

    insertPowers({
      title: "Sedang",
    });

    insertPowers({
      title: "Kuat",
    });
  }
});
