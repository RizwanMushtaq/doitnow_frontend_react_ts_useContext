import React, {useRef} from 'react'
import Style from "./LoginPage.module.scss"
import { logWithDebug } from '../../utils/logHandling'

import { EnteredDataLoginPage, verifyUser } from '../../auth/userAuth'

import UserLogo from './../../assets/images/Benutzer.svg'
import PasswordLogo from './../../assets/images/Passwortschloss.svg'

interface LoginPageProps {
    setAppState: (value: string | ((prevVar: string) => string)) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({setAppState}) => {

    logWithDebug('In LoginPage Component')

    const usernameInputRef = useRef<HTMLInputElement>(null)
    const usernameInputContainerRef = useRef<HTMLDivElement>(null)
    const passwordInputRef = useRef<HTMLInputElement>(null)
    const passwordInputContainerRef = useRef<HTMLDivElement>(null)

    
    const handleLoginRequest = () => {
            isInputEmpty()
            const enteredData = getInputData()
            verifyUser(enteredData).then( response => {
                logWithDebug(response)
                handleSuccessfulLogin(response)
            }).catch( error => {
                handleFailedLogin(error)
            })
    }
    const isInputEmpty = () => {
        if(usernameInputRef.current!.value.trim() === ""){
            usernameInputContainerRef.current!.style.border = '2px solid red'
            const error = new Error('Username field is empty')
            throw error
        }
        if(usernameInputRef.current!.value.trim() !== ""){
            usernameInputContainerRef.current!.style.border = '1px solid black'
        }
        if(passwordInputRef.current!.value.trim() === ""){
            passwordInputContainerRef.current!.style.border = '2px solid red'
            const error = new Error('Password field is empty')
            throw error
        }
        if(passwordInputRef.current!.value.trim() !== ""){
            passwordInputContainerRef.current!.style.border = '1px solid black'
        }
        return true
    }
    const getInputData = ():EnteredDataLoginPage => {
        const username = usernameInputRef.current!.value
        const password = passwordInputRef.current!.value

        return {
            enteredUsername: username,
            enteredPassword: password
        }
    }
    const handleSuccessfulLogin = (response: any) => {
        const bearerToken = 'Bearer ' + response.data.accessToken
        localStorage.setItem("BearerToken", bearerToken)
        localStorage.setItem("userName", response.data.userName)
        localStorage.setItem("userID", response.data.userID)
        localStorage.setItem("userEMail", response.data.userEMail)
        setAppState('AppPage')
    }
    const handleFailedLogin = (error: any) => {
        if(error.response) {
            logWithDebug(error.response.data);
            logWithDebug(error.response.status);
            logWithDebug(error.response.headers);
            alert('Incorrect username or password')
            throw error
        } else if(error.request) {
            logWithDebug(error.request)
            throw error
        } else {
            throw error
        }
    }

    
    const handleRegisterRequest = () => {
        setAppState('RegistrationPage')
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
                    <div className={Style.InputContainerInner} ref={passwordInputContainerRef}>
                        <div>
                            <img src={PasswordLogo} alt='PasswordLogo'></img>
                        </div>
                        <input type='password' id='LoginFormPasswordInput' placeholder='password' ref={passwordInputRef}></input>
                    </div>
                    <p className={Style.forgotPasswordLabel} >Forgot password?</p>
                </div>
                <div className={Style.buttonContainer}>
                    <button className={Style.loginButton} onClick={handleLoginRequest}>Login</button>
                    <button className={Style.registerButton} onClick={handleRegisterRequest}>Join Now</button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
