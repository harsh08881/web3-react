import React from 'react'
import Home from './Pages/Home'
import './App.css'
import Activity from './Pages/Activity'
import { ThemeProvider , useTheme } from './contexts/DarkContext'

const MainApp = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  console.log(isDarkMode, "Mainapp")
  return (
    <>
    <div>
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
