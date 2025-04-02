import {useContext, useState} from "react";
import {
    Navbar,
    Nav,
    Container,
    Button,
    Image,
    Dropdown,
    NavDropdown,
    NavItem,
    NavLink,
    Form,
    Row, Col
} from "react-bootstrap";
import {AuthContext} from "../context/AuthContext.jsx";
import {FaSearch, FaBell, FaGift, FaCheck, FaFolder, FaBars} from "react-icons/fa"
import profileImage from "../assets/default_user.png";
import Brand from "../assets/Brand.svg";
import {AuthenticatedSideBar} from "./AuthenticatedSideBar.jsx";


export const AuthenticatedNavBar = () => {
    const {user} = useContext(AuthContext)
    const [collapsed, setCollapsed] = useState(false)

    return (
        <>
            <Navbar sticky="top" style={{backgroundColor: '#000000',height:'12vh'}}>
                <Container fluid>
                    <Navbar.Brand href="#" style={
                        {
                            // height:'126.49px'
                        }
                    }>
                        <div className='d-flex align-items-center'>
                            <Image
                                src={Brand}
                                width='165'
                                height='100'
                                alt=''
                            />
                            <FaBars className="ms-lg-3 ms-md-1 ms-sm-1 text-secondary" onClick={
                                () => {
                                    setCollapsed(!collapsed)
                                }
                            }/>
                        </div>
                    </Navbar.Brand>


                    {/*Search Box*/}
                    <Form inline>
                        <Row className="position-relative">
                            <Col xs="auto">
                                <FaSearch className="position-absolute top-50 translate-middle-y ms-3"/>
                                <Form.Control
                                    type="text"
                                    placeholder="Search here"
                                    className="ps-5 rounded-pill"
                                />
                            </Col>
                        </Row>
                    </Form>


                    {/*Nav Icons*/}
                    <Nav className="justify-content-center">
                        <Nav.Item>
                            <Nav.Link href="#"><FaBell className="text-secondary"/></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#"><FaGift className="text-secondary"/></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#"><FaCheck className="text-secondary"/></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#"><FaFolder className="text-secondary"/></Nav.Link>
                        </Nav.Item>
                    </Nav>


                    {/*Nav Profile and Dropdown*/}
                    <Nav className="d-flex justify-content-center">

                        <Dropdown as={NavItem}>
                            <Dropdown.Toggle as={NavLink} className="nav-link d-flex align-items-center text-white">
                                <Image
                                    rounded
                                    src={profileImage}
                                    alt=""
                                    width={50}
                                    height={50}
                                    className="me-3"
                                />
                                <div className="d-flex flex-column me-5">
                                    <strong style={{fontSize: 12}}>{user.username}</strong>
                                    <small style={{fontSize: 12}}>{user.user_type}</small>
                                </div>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#">Profile</Dropdown.Item>
                                <Dropdown.Item href="#">Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>

                </Container>
            </Navbar>
            {
                // Side Bar
                !collapsed && (
                    <AuthenticatedSideBar/>
                )

            }
        </>


    )
}

