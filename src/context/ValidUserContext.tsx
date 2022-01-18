import React from "react"

type GlobalState = {
    isLoggedIn: boolean
    setIsLoggedIn: (value: boolean) => void;
}

export const validUserContext = React.createContext<GlobalState>({
    isLoggedIn: false,
    setIsLoggedIn: () => {}
})