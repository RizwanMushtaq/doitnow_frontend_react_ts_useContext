import React, {useRef} from 'react'
import Style from './RegistrationPage.module.scss'

import UserLogo from './../../assets/images/Benutzer.svg'
import PasswordLogo from './../../assets/images/Passwortschloss.svg'

interface LoginPageProps {
    setAppState: (value: string | ((prevVar: string) => string)) => void;
}

const RegistrationPage: React.FC<LoginPageProps> = ({setAppState}) => {

    const usernameInputRef = useRef<HTMLInputElement>(null)
    const usernameInputContainerRef = useRef<HTMLDivElement>(null)
    const passwordInputRef = useRef<HTMLInputElement>(null)
    const passwordInputContainerRef = useRef<HTMLDivElement>(null)

    const handleRegistrationRequest = () => {

    }
    const handleBackToLoginRequest = () => {
        setAppState('LoginPage')
    }

    return (
        <div className={Style.container}>
            <div className={Style.titleContainer}>
                <h1>Do It Now App</h1>
            </div>
            <div className={Style.formContainer}>
                <div className={Style.InputContainer}>
                    <div className={Style.InputContainerInner} ref={usernameInputContainerRef}>
                        <div>
                            <img src={UserLogo} alt='UserLogo'></img>
                        </div>
                        <input type='text' id='LoginFormUserInput' placeholder='username' ref={usernameInputRef}></input>
                    </div>
                    <div className={Style.InputContainerInner} ref={usernameInputContainerRef}>
                        <div>
                            <img src={UserLogo} alt='UserLogo'></img>
                        </div>
                        <input type='text' id='LoginFormUserInput' placeholder='email' ref={usernameInputRef}></input>
                    </div>
                    <div className={Style.InputContainerInner} ref={passwordInputContainerRef}>
                        <div>
                            <img src={PasswordLogo} alt='PasswordLogo'></img>
                        </div>
                        <input type='password' id='LoginFormPasswordInput' placeholder='password' ref={passwordInputRef}></input>
                    </div>
                </div>
                <div className={Style.buttonContainer}>
                    <button className={Style.loginButton} onClick={handleRegistrationRequest}>Register</button>
                    <button className={Style.registerButton} onClick={handleBackToLoginRequest}>Back to login</button>
                </div>
            </div>
        </div>
    )
}

export default RegistrationPage
