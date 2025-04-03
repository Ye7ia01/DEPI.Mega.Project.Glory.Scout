import {useContext, useEffect, useState} from "react";
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
import Brand from "../assets/logo.svg";
import Notification from '../assets/notification.svg'
import Check from '../assets/check.svg'
import Folder from '../assets/folder.svg'
import Gift from '../assets/gift.svg'
import {AuthenticatedSideBar} from "./AuthenticatedSideBar.jsx";
import {NavbarLogo} from "./NavbarLogo.jsx";

export const AuthenticatedNavBar = ({collapsed, setCollapsed}) => {

    const {user} = useContext(AuthContext)
    const [searchVisible, setSearchVisible] = useState(false)


    return (
        <>
            <Navbar expand={false} className='upper-nav-bar pt-0 pb-0'>

                <Container fluid>

                    <Button className='bg-transparent border-0' onClick={() => setCollapsed(!collapsed)}>
                        <FaBars style={
                            {
                                width:'20px',
                                height:'50px'

                            }
                        }/>
                    </Button>
                    <Form inline>
                        <Row className="position-relative">
                            <Col xs="auto">
                                <Button className='d-lg-none d-md-none d-block bg-transparent border-0'
                                onClick={
                                    () => {
                                        setSearchVisible(!searchVisible)
                                    }
                                }
                                >
                                    <FaSearch/>
                                </Button>
                                <div className='d-none d-lg-block d-md-block'>
                                    <FaSearch className="position-absolute top-50 translate-middle-y ms-3"/>
                                    <Form.Control
                                        type="text"
                                        placeholder="Search here"
                                        className="ps-5 rounded-pill"
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Form>


                    {/*Nav Icons*/}
                    <Nav className="d-flex flex-row evenly">

                        <Nav.Item className='me-3'>
                            <Nav.Link href="#">
                                <Image src={Notification}
                                       className='img-fluid'
                                       width='20px'
                                       height='20px'
                                />
                                {/*<FaBell className="text-secondary"/>*/}
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className='me-3'>

                            <Nav.Link href="#">
                                <Image src={Gift}
                                    className='img-fluid'
                                       width='20px'
                                       height='20px'
                                />
                                {/*<FaGift className="text-secondary"/>*/}
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className='me-3'>
                            <Nav.Link href="#">
                                <Image src={Check}
                                       className='img-fluid'
                                       width='20px'
                                       height='20px'
                                />
                                {/*<FaCheck className="text-secondary"/>*/}
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className='me-3'>
                            <Nav.Link href="#">
                                <Image src={Folder}
                                       className='img-fluid'
                                       width='20px'
                                       height='20px'
                                />
                                {/*<FaFolder className="text-secondary"/>*/}
                            </Nav.Link>
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

                                    className="me-md-3 me-lg-3 img-fluid"
                                />
                                <div className="d-flex flex-column me-2 d-lg-block d-md-block d-none">
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
                {
                    searchVisible && (
                <div className='w-100 m-3 d-lg-none d-md-none'>
                    <Form inline>
                        <Row className="position-relative">
                            <Col>
                                {/*<Button className='bg-transparent border-0'>*/}
                                {/*    <FaSearch/>*/}
                                {/*</Button>*/}
                                <div className=''>
                                    <FaSearch className="position-absolute top-50 translate-middle-y ms-3"/>
                                    <Form.Control
                                        type="text"
                                        placeholder="Search here"
                                        className="ps-5 rounded-pill"
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </div>
                    )
                }
            </Navbar>
            <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
                <AuthenticatedSideBar collapsed={collapsed} setCollapsed={setCollapsed}/>
            </div>
        </>
    )
}