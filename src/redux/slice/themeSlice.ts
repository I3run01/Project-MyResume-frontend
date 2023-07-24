import { createSlice } from '@reduxjs/toolkit'

export interface ThemeState {
  isDark: boolean
}

const initialState: ThemeState = {
  isDark: true
}


export const counterSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: (state) => {
      state.isDark ? state.isDark = false : state.isDark = true
    },
  },
})

export const { changeTheme } = counterSlice.actions

export default counterSlice.reducer