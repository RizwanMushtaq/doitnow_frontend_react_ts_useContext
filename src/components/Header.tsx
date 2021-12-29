import React from 'react'
import Style from './Header.module.scss'

interface HeaderProps {
    setAppState: (value: string | ((prevVar: string) => string)) => void;
}

const Header:React.FC<HeaderProps> = ({setAppState}) => {

    const logoutHandler = () => {
        setAppState('LoginPage')
    }

    return (
        <div className={Style.container}>
            <div className={Style.welcomeDiv}>Welcome</div>
            <div className={Style.logoutDiv}> 
                <button onClick={logoutHandler}>Logout</button>
            </div>
        </div>
    )
}

export default Header
