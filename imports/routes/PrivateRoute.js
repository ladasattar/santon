import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FormEfekPelet } from "../components/forms/FormEfekPelet";
import { FormIsiKiriman } from "../components/forms/FormIsiKiriman";
import { Activity } from "../pages/Activity";
import { LandingPage } from "../pages/LandingPage";
import { OnboardFeature } from "../pages/OnboardFeature";
import { Payment } from "../pages/Payment";
import { SuccessSummary } from "../pages/SuccesSummary";
import { TargetForm } from "../pages/TargetForm";

export const PrivateRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/activity" element={<Activity />} />

        <Route exact path="/santet-online" element={<OnboardFeature />} />
        <Route
          exact
          path="/santet-online/targeting"
          element={<TargetForm type="santet" />}
        />
        <Route
          exact
          path="/santet-online/targeting/isi-kiriman"
          element={<FormIsiKiriman />}
        />
        <Route
          exact
          path="/santet-online/success"
          element={<SuccessSummary type="santet" />}
        />

        <Route exact path="/pelet-online" element={<OnboardFeature />} />
        <Route
          exact
          path="/pelet-online/targeting"
          element={<TargetForm type="pelet" />}
        />
        <Route
          exact
          path="/pelet-online/targeting/efek"
          element={<FormEfekPelet />}
        />
        <Route
          exact
          path="/pelet-online/success"
          element={<SuccessSummary type="pelet" />}
        />

        <Route exact path="/proteksi-online" element={<OnboardFeature />} />
        <Route
          exact
          path="/proteksi-online/targeting"
          element={<TargetForm type="proteksi" />}
        />
        <Route
          exact
          path="/proteksi-online/success"
          element={<SuccessSummary type="proteksi" />}
        />

        <Route
          exact
          path="/santet-online/pilih-tumbal"
          element={<Payment for="santet" />}
        />
        <Route
          exact
          path="/pelet-online/pilih-tumbal"
          element={<Payment for="pelet" />}
        />
        <Route
          exact
          path="/proteksi-online/pilih-tumbal"
          element={<Payment for="proteksi" />}
        />
        <Route exact path="/login" element={<Navigate replace to="/" />} />
        <Route exact path="/register" element={<Navigate replace to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};
