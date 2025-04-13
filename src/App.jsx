import {AuthContext, AuthProvider} from "./context/AuthContext.jsx";
import { Route, Routes } from "react-router-dom";
import {AuthenticatedNavBar} from "./components/AuthenticatedNavBar.jsx";
import {AuthenticatedSideBar} from "./components/AuthenticatedSideBar.jsx";
import {Col, Container, Row} from "react-bootstrap";
import collapse from "bootstrap/js/src/collapse.js";
import {useState} from "react";
import Contact from "./components/Contact";
import FAQ from "./Components/FAQ.jsx";

function App() {

    const [collapsed, setCollapsed] = useState(false)

    return (
        <AuthProvider>
            <Routes>
            </Routes>
            <AuthenticatedNavBar collapsed={collapsed} setCollapsed={setCollapsed}/>
            <FAQ/>
            <Contact/>
            

        </AuthProvider>
    )
}

export default App;