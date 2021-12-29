import React, {ReactElement, useState} from 'react';
import './App.css';

import LoginPage from './pages/login/LoginPage'
import AppPage from './pages/app/AppPage';

const App: React.FC = () => {
  
  let [appState, setAppState] = useState("LoginPage")
  let RenderComponent: ReactElement = <LoginPage setAppState={setAppState}/>
  
  if(appState === 'LoginPage'){
    RenderComponent = <LoginPage setAppState={setAppState}/>
  }else if(appState === 'AppPage'){
    RenderComponent = <AppPage />
  }

  return (
    <div className="App">
      {RenderComponent}
    </div>
  )

}

export default App