import {useContext, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {AuthContext, AuthProvider} from "./context/AuthContext.jsx";

import './App.css'
import {AuthenticatedNavBar} from "./components/AuthenticatedNavBar.jsx";

function App() {
    const [count, setCount] = useState(0)

    return (
        <AuthProvider>
            <AuthenticatedNavBar/>

        </AuthProvider>
    )
}

export default App
