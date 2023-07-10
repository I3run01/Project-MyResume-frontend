import { takeLatest, put, call } from 'redux-saga/effects';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchUser, changeUser } from '../slice/userSlice';
import { User } from '@/requests/user';

function* fetchUserSaga(action: PayloadAction<void>): Generator<any, void, any> {
  try {
    const user = new User();
    const response: string = yield call([user, user.user]);

    yield put(changeUser(JSON.parse(response)));
  } catch (err: any) {
    yield put(changeUser(null));
    
    if(err.data?.message) return console.log(err.data.message)

    else if(err.message) return console.log(err.message)

    else return console.log('Something wrong happened')

  }
}

function* userSaga(): Generator<any, void, any> {
  yield takeLatest(fetchUser.type, fetchUserSaga);
}

export default userSaga;
