import React, {ReactElement, useState} from 'react';
import './App.css';

import LoginPage from './pages/login/LoginPage'
import AppPage from './pages/app/AppPage';
import RegistrationPage from './pages/registration/RegistrationPage';

const App: React.FC = () => {
  
  let [appState, setAppState] = useState("LoginPage")
  let RenderComponent: ReactElement = <LoginPage setAppState={setAppState}/>
  
  if(appState === 'LoginPage'){
    RenderComponent = <LoginPage setAppState={setAppState}/>
  }else if(appState === 'AppPage'){
    RenderComponent = <AppPage setAppState={setAppState}/>
  }else if(appState === 'RegistrationPage'){
    RenderComponent = <RegistrationPage setAppState={setAppState}/>
  }

  return (
    <div className="App">
      {RenderComponent}
    </div>
  )

}

export default App