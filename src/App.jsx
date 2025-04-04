import {AuthContext, AuthProvider} from "./context/AuthContext.jsx";
import { Route, Routes } from "react-router-dom";
import {AuthenticatedNavBar} from "./components/AuthenticatedNavBar.jsx";
import {AuthenticatedSideBar} from "./components/AuthenticatedSideBar.jsx";
import {Col, Container, Row} from "react-bootstrap";
import collapse from "bootstrap/js/src/collapse.js";
import {useState} from "react";

function App() {
    return (
        <AuthProvider>
            <Routes>
            </Routes>
            <AuthenticatedNavBar />

        </AuthProvider>
    )
}

export default App;