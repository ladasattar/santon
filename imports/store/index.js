import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "app-persist",
  storage: sessionStorage,
});

const authenticated = atom({
  key: "authenticated",
  default: {
    check: false,
    user: [],
  },
  effects_UNSTABLE: [persistAtom],
});

const alertPersist = atom({
  key: "alert",
  default: {
    show: false,
    header: "",
    body: "",
  },
});

const floatingAlertPersist = atom({
  key: "floating-alert",
  default: {
    show: false,
    message: "",
  },
});

export { authenticated, alertPersist, floatingAlertPersist };
