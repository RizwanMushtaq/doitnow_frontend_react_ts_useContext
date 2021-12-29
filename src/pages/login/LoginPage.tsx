import React, {useRef} from 'react'
import Style from "./LoginPage.module.scss"

import { EnteredData, isUserValid } from '../../auth/userAuth'

import UserLogo from './../../assets/images/Benutzer.svg'
import PasswordLogo from './../../assets/images/Passwortschloss.svg'

interface LoginPageProps {
    setAppState: (value: string | ((prevVar: string) => string)) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({setAppState}) => {

    const usernameInputRef = useRef<HTMLInputElement>(null)
    const usernameInputContainerRef = useRef<HTMLDivElement>(null)
    const passwordInputRef = useRef<HTMLInputElement>(null)
    const passwordInputContainerRef = useRef<HTMLDivElement>(null)

    const handleLoginRequest = () => {
        try {
            isInputEmpty()
            const enteredData = getInputData()
            if(isUserValid(enteredData)) {
                setAppState('AppPage')
            }
        } catch (error) {
            throw error
        }
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
    const getInputData = ():EnteredData => {
        const username = usernameInputRef.current!.value
        const password = passwordInputRef.current!.value

        return {
            enteredUsername: username,
            enteredPassword: password
        }
    }

    return (
        <div className={Style.container}>
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
                    <button onClick={handleLoginRequest}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
