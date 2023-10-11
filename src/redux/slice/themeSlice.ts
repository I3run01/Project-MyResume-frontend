import { createSlice } from '@reduxjs/toolkit'

export interface ThemeState {
  isDark: boolean
}

const initialState: ThemeState = {
  isDark: false
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
    setDark: (state) => {
      state.isDark = true
    },
    setLight: (state) => {
      state.isDark = false
    }
  }, 
})

export const { changeTheme, setDark, setLight } = counterSlice.actions

export default counterSlice.reducer