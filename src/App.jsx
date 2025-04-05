import {AuthContext, AuthProvider} from "./context/AuthContext.jsx";
import { Route, Routes } from "react-router-dom";
import {AuthenticatedNavBar} from "./components/AuthenticatedNavBar.jsx";
import {AuthenticatedSideBar} from "./components/AuthenticatedSideBar.jsx";
import {Col, Container, Row} from "react-bootstrap";
import collapse from "bootstrap/js/src/collapse.js";
import {useState} from "react";
import Contact from "./components/Contact";

function App() {
    return (
        <AuthProvider>
            <Routes>
            </Routes>
            <AuthenticatedNavBar />
            <Contact/>

        </AuthProvider>
    )
}

export default App;