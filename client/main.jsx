import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import { App } from "/imports/pages/App";
import { RecoilRoot } from "recoil";

Meteor.startup(() => {
  render(
    <RecoilRoot>
      <App />
    </RecoilRoot>,
    document.getElementById("react-target")
  );
});
