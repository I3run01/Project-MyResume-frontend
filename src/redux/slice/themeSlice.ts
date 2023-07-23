import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ThemeState {
  isDark: boolean
}

let isDarkInitial = true;
if (typeof window !== 'undefined') {
  isDarkInitial = window.localStorage.getItem('theme') === 'light' ? false : true;
}

const initialState: ThemeState = {
  isDark: isDarkInitial,
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: (state) => {
      state.isDark = !state.isDark;
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('theme', state.isDark ? 'dark' : 'light')
      }
    },
  },
})

export const { changeTheme } = themeSlice.actions

export default themeSlice.reducer
