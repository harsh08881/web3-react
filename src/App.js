import React from 'react'
import Home from './Pages/Home'
import './App.css'
import Activity from './Pages/Activity'
import { ThemeProvider , useTheme } from './contexts/DarkContext'

const MainApp = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <>
    <div>
    <button onClick={toggleTheme}>
        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
      <Home/>
      <Activity/>
    </div>
    </> 
  )
}

const App =  ( ) =>{
return (
  <ThemeProvider>
    <MainApp/>
  </ThemeProvider>
)
}

export default App
