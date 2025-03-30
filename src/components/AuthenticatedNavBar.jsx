import {useContext} from "react";
import { Navbar, Nav, Container , Button } from "react-bootstrap";
import {AuthContext} from "../context/AuthContext.jsx";

export const AuthenticatedNavBar = () => {
    const {user} = useContext(AuthContext)

    return (
        // expand="lg"
        <Navbar bg="dark" >
            <Container>
                <Nav>
                    Navbar
                </Nav>

            </Container>
        </Navbar>
    )
}

