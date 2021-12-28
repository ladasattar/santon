import React from "react";
import { PrivateRoute } from "../routes/PrivateRoute";
import { PublicRoute } from "../routes/PublicRoute";
import { useRecoilValue } from "recoil";
import { authenticated } from "../store";

export const App = () => {
  const auth = useRecoilValue(authenticated);

  return <>{!auth.check ? <PublicRoute /> : <PrivateRoute />}</>;
};
