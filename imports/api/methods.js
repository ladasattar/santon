import { check, Match } from "meteor/check";
import { ActivitiesCollection } from "../db/ActivitiesCollection";

Meteor.methods({
  insertActivitySantet: (
    feature_id,
    target_info,
    isi,
    efek,
    payment_method_id,
    userId
  ) => {
    ActivitiesCollection.insert({
      feature_id,
      target_info,
      isi,
      efek,
      payment_method_id,
      userId,
      createdAt: new Date(),
    });
  },

  insertActivityPelet: (
    feature_id,
    target_info,
    payment_method_id,
    jangka_waktu,
    auto_renewal,
    userId
  ) => {
    ActivitiesCollection.insert({
      feature_id,
      target_info,
      payment_method_id,
      jangka_waktu,
      auto_renewal,
      userId,
      createdAt: new Date(),
    });
  },

  addProteksi: (
    feature_id,
    payment_method_id,
    jangka_waktu,
    kekuatan_proteksi,
    userId
  ) => {
    ActivitiesCollection.insert({
      feature_id,
      payment_method_id,
      jangka_waktu,
      kekuatan_proteksi,
      userId,
      createdAt: new Date(),
    });
  },

  removeActivity: (activity_id) =>
    ActivitiesCollection.remove({ _id: activity_id }),

  sendEmail(to, from, subject, text) {
    // Make sure that all arguments are strings.
    check([to, from, subject, text], [String]);

    // Let other method calls from the same client start running, without
    // waiting for the email sending to complete.
    this.unblock();

    Email.send({ to, from, subject, text });
  },
});
