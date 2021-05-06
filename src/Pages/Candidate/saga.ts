import { put, takeLatest, call } from 'redux-saga/effects';
import { ActionTypes, Actions } from './actions';
import { Candidate } from '../../service/index';
function* addCandidate(action: any) {
  const { data } = action.payload;
  console.log('payload', data);
  try {
    const response = yield call(Candidate.addCandidate, data);
    console.log(response);
    if (response) {
      yield put(Actions.addCandidateSuccess());
    } else {
      yield put(Actions.addCandidateFailure('Data Not Found'));
    }
  } catch (error) {
    console.log(error);
    yield put(Actions.addCandidateFailure(error.message));
  }
}

export default function* addCandidateSaga() {
  yield takeLatest(ActionTypes.ADD_CANDIDATE_PROGRESS, addCandidate);
}