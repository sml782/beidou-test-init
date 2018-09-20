import createSagaMiddleware from 'redux-saga';
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'client/utils/request';
import queryString from 'query-string';
import { message } from 'antd';
import actions from '../actions';
import { Encrypt } from 'client/utils/crypto';

// create the saga middleware
export const sagaMiddleware = createSagaMiddleware();

function* login({ payload: { username, password } }) {
  yield put(actions.loading());
  try {
    const res = yield axios.post('login', {
      username: Encrypt(username),
      password: Encrypt(password),
    });

    if (res.statusText === 'OK' && res.data.success) {
      yield put(actions.logined());
      message.success(res.data.data);
      setTimeout(() => {
        const url = queryString.parse(window.location.search).r || '/dashboard';
        window.location.href = url;
      }, 1000);
    } else {
      yield put(
        actions.rejected(res.data.message || 'Error password or username')
      );
      message.error(res.data.message);
    }
  } catch (e) {
    console.log(e);
  }
}

function* saga() {
  yield takeLatest(actions.login, login);
}

// entry point
export const run = () => {
  sagaMiddleware.run(saga);
};

export default {
  saga,
  sagaMiddleware,
  run,
};
