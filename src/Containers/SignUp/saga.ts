import { put, takeLatest, call } from 'redux-saga/effects';
import { ActionTypes, Actions } from './actions';
import { Authentication } from '../../service/index';

export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}
function* signUp(action: any) {
  const { signUp } = action.payload;
  try {
    if (signUp) {
      const response: ResponseGenerator = yield call(
        Authentication.signUp,
        signUp,
      );
      console.log(response);
    }
    yield put(Actions.signUpSuccess());
  } catch (error) {
    console.log('err', error);
    yield put(Actions.signUpFailure(error && error.message));
  }
}

// function* login(action: any) {
//   const { login, firebase } = action.payload
//   try {
//     yield firebase.login(login)
//     yield put(Actions.loginSuccess())
//   } catch (error) {
//     console.log('err', error)
//     yield put(Actions.loginFailure(error && error.message))
//   }
// }

// function* forgetPassword(action: any) {
//   const { email, firebase } = action.payload
//   try {
//     yield firebase.resetPassword(email)

//     yield put(Actions.forgetPasswordSuccess())
//   } catch (error) {
//     console.log('err', error)
//     yield put(Actions.forgetPasswordFailure(error && error.message))
//   }
// }

export default function* authSaga() {
  yield takeLatest(ActionTypes.SIGNUP_PROGRESS, signUp);
  //   yield takeLatest(ActionTypes.LOGIN_PROGRESS, login)
  //   yield takeLatest(ActionTypes.FORGET_PASSWORD_PROGRESS, forgetPassword)
}
