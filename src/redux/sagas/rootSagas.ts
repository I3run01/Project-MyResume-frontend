import { all } from 'redux-saga/effects';
import userSaga from '@/redux/sagas/userSaga';

export function* rootSaga() {
    yield all([
        userSaga(),
    ])
}