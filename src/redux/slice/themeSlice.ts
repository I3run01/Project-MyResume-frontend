import { createSlice } from '@reduxjs/toolkit'

export interface ThemeState {
  isDark: boolean
}

const initialState: ThemeState = {
  isDark: typeof window !== 'undefined' && window.localStorage.getItem('theme') !== 'light'

}


export const counterSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: (state) => {
      state.isDark ? state.isDark = false : state.isDark = true
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('theme', state.isDark ? 'dark' : 'light')
      }
    },
  },
})

export const { changeTheme } = counterSlice.actions

export default counterSlice.reducer