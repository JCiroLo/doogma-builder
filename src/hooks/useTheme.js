import { useContext } from 'react'
import { ThemeContext } from '../store/ThemeProvider'

const useTheme = () => {
  return useContext(ThemeContext)
}

export default useTheme
