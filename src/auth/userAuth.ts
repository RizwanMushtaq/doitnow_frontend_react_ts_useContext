import {apiEndPoints} from '../config/apiEndPoints'
import axios from 'axios'

export interface EnteredDataLoginPage {
    enteredUsername: string,
    enteredPassword: string
}

export const verifyUser = async (enteredData: EnteredDataLoginPage) => {
  return axios.post(
      apiEndPoints.userLogin,
      {
          "username":enteredData.enteredUsername,
          "password":enteredData.enteredPassword
      }
  )
}