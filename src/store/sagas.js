import { all, fork } from "redux-saga/effects"

//public
import AuthSaga from "./auth/login/saga"
import ProfileSaga from "./auth/profile/saga"
import LayoutSaga from "./layout/saga"


export default function* rootSaga() {
  yield all([
    //public
    fork(AuthSaga),
    ProfileSaga(),
    LayoutSaga(),
  ])
}
