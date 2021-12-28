import React from "react";
import { Feature } from "../components/Feature.jsx";
import { KarmaTracker } from "../components/KarmaTracker";
import { FeaturesCollection } from "../db/FeaturesCollection.js";
import { useTracker } from "meteor/react-meteor-data";
import { Header } from "../components/Header.jsx";
import { Alert } from "../components/Alert.jsx";
import { useRecoilState } from "recoil";
import { authenticated } from "../store/index.js";

export const LandingPage = () => {
  const features = useTracker(() => FeaturesCollection.find({}).fetch());
  const [auth, setAuth] = useRecoilState(authenticated);
  const isDisabled = auth?.user?.profile?.karma >= 100 ? true : false;
  React.useEffect(() => {
    localStorage.removeItem("activity");
    localStorage.removeItem("target_photo");
  }, []);

  return (
    <>
      <div className="container d-flex flex-column justify-content-center">
        <Header />
        <KarmaTracker />
      </div>
      <div className="feature-wrapper d-flex">
        {features.map((feature) => (
          <Feature
            key={feature._id}
            feature={feature}
            isDisabled={isDisabled}
          />
        ))}
      </div>
      {isDisabled ? (
        <small className="text-attention-karma opacity-50 fw-light ps-3 my-0">
          *Fitur dimatikan karena karma melebihi 100%
        </small>
      ) : (
        <div></div>
      )}
      <Alert />
    </>
  );
};
