import React, {useContext} from 'react'
import Style from './Header.module.scss'
import { validUserContext } from '../context/ValidUserContext'

const Header:React.FC = () => {

    const validUser_Context = useContext(validUserContext)
    const username = localStorage.getItem('userName')

    const logoutHandler = () => {
        validUser_Context.setIsLoggedIn(false)
    }

    return (
        <div className={Style.container}>
            <div className={Style.welcomeDiv}>Welcome {username}</div>
            <div className={Style.logoutDiv}> 
                <button onClick={logoutHandler}>Logout</button>
            </div>
        </div>
    )
}

export default Header
