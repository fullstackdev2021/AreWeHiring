import { put, takeLatest, call } from 'redux-saga/effects';
import { ActionTypes, Actions } from './actions';
import { JobSearch, ApplicationSearch, Job } from '../../../../service/index';
import { notification } from 'antd';
export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}
function* jobsInApprove(action: any) {
  const { userId } = action.payload;
  try {
    if (userId) {
      const response: ResponseGenerator = yield call(
        JobSearch.jobsInApprove,
        userId,
      );
      yield put(Actions.jobsInApproveSuccess(response.data));
    }
  } catch (error) {
    yield put(
      Actions.jobsInApproveFailure(error && error.response.data.message),
    );
  }
}

function* ApproveJob(action: any) {
  const { userId, jobId } = action.payload;
  try {
    if (userId && jobId) {
      const response: ResponseGenerator = yield call(
        JobSearch.approveJob,
        userId,
        jobId,
      );
      notification.success({
        type: 'success',
        message: 'Job Approved Successfully',
        closeIcon: true,
        placement: 'topRight',
      });
      yield put(Actions.approveJobSuccess(response.data));
    }
  } catch (error) {
    notification.error({
      type: 'error',
      message: error.response.data.message,
      closeIcon: true,
      placement: 'topRight',
    });
    yield put(Actions.approveJobFailure(error && error.response.data.message));
  }
}

function* getApplicationsForThisJob(action: any) {
  const { jobId } = action.payload;
  try {
    if (jobId) {
      const response: ResponseGenerator = yield call(
        ApplicationSearch.applicationsSearchByJobId,
        jobId,
      );
      yield put(Actions.getApplicationsForThisJobSuccess(response.data));
    }
  } catch (error) {
    yield put(
      Actions.getApplicationsForThisJobFailure(
        error && error.response.data.message,
      ),
    );
  }
}

function* renewJob(action: any) {
  const { userId, jobId } = action.payload;
  try {
    if (userId && jobId) {
      const response: ResponseGenerator = yield call(
        Job.renewJob,
        jobId,
        userId,
      );
      notification.success({
        type: 'success',
        message: 'Job Renewed Successfully',
        closeIcon: true,
        placement: 'topRight',
      });
      yield put(Actions.renewJobSuccess());
    }
  } catch (error) {
    notification.error({
      type: 'error',
      message: error.response.data.message,
      closeIcon: true,
      placement: 'topRight',
    });
    yield put(Actions.RenewJobFailure(error && error.response.data.message));
  }
}

export default function* approveJobSaga() {
  yield takeLatest(ActionTypes.JOBS_IN_APPROVE_PROGRESS, jobsInApprove);
  yield takeLatest(ActionTypes.APPROVE_JOB_PROGRESS, ApproveJob);
  yield takeLatest(
    ActionTypes.GET_APPLICATIONS_FOR_THIS_JOB_PROGRESS,
    getApplicationsForThisJob,
  );
  yield takeLatest(ActionTypes.RENEW_JOB_PROGRESS, renewJob);
}
