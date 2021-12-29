export interface EnteredData {
    enteredUsername: string,
    enteredPassword: string
}
export const isUserValid = (enteredData: EnteredData):boolean => {
    
    if(enteredData.enteredUsername !== 'admin'){
      const error = new Error('Incorrect username')
      throw error
    } else if(enteredData.enteredPassword !== 'admin'){
      const error = new Error('Incorrect password')
      throw error
    }

    return true
}