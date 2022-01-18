import React, {useState} from 'react';
import './App.css';

import { validUserContext } from './context/ValidUserContext'
import { Routes, Route, Navigate  } from 'react-router-dom'

import LoginPage from './pages/login/LoginPage'
import AppPage from './pages/app/AppPage';
import RegistrationPage from './pages/registration/RegistrationPage';

const App: React.FC = () => {
  
  let [isLoggedIn, setIsLoggedIn] = useState(false)
  
  return (
    <validUserContext.Provider 
      value={{
        isLoggedIn: isLoggedIn,
        setIsLoggedIn: setIsLoggedIn
      }}>

      <div className='app'>
        <Routes>
          <Route path='/'  element={<Navigate replace to="/login" />}></Route>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/registration' element={<RegistrationPage />}></Route>
          {
            !isLoggedIn && <Route path='/app' element={<Navigate replace to="/login" />}></Route>
          }
          {
            isLoggedIn && <Route path='/app' element={<AppPage />}></Route>
          }
        </Routes>
      </div>

    </validUserContext.Provider>
  )
}

export default App

