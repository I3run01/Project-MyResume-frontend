import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { userType } from '../../types/user'

export interface userState {
  user: userType | null
  requestState: number
}

const initialState: userState = {
    user: null,
    requestState: 0
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUser: state => { console.log('fetchUser') },
    changeUser: (state, action: PayloadAction<userType | null>) => {
      state.user = action.payload
      state.requestState += 1;
    },
  },
})

export const { changeUser, fetchUser } = userSlice.actions

export default userSlice.reducer