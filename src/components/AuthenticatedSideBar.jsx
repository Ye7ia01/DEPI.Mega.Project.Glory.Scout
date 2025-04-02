import {Image, Nav, Navbar} from "react-bootstrap";
import Brand from '../assets/Brand.svg'
import Contact from '../assets/contactIcon.svg'
import FAQ from '../assets/FaqIcon.svg'
import Email from '../assets/emailIcon.svg'
import Home from '../assets/homeIcon.svg'
import Player from '../assets/playerIcon.svg'
import Settings from '../assets/settingsIcon.svg'
import Banner from '../assets/Banner.svg'
import {FaBars, FaHome, FaEnvelope, FaQuestionCircle, FaPhoneAlt, FaUser, FaCog} from "react-icons/fa";
import {useState} from "react";


export const AuthenticatedSideBar = () => {

    const [visible, setVisible] = useState(true)
    const [activePage, setActivePage] = useState('home')
    console.log("Active Page: ",activePage)

    return (

        <Navbar variant="dark" className="d-flex flex-column ps-lg-5 ps-sm-1 ps-md-1 align-items-start h-100 nav-bar"
                     style={{ minHeight:'100vh'}}>

            <Nav className="d-flex flex-column justify-content-evenly flex-grow-1">
                <p className="side-bar-text">Main Menu</p>

                <Nav.Item>
                    <Nav.Link href="#" className="d-flex align-items-center ps-0 " onClick={
                        () => setActivePage('home')
                    }>
                        <Image className={`me-3 ms-0 $(activePage === 'home' ? 'active' ? 'svg-icon'`}
                               src={Home}
                               width='28px'
                               height='29.51px'
                        />
                      <span className={`side-bar-items active ${activePage === 'home' ? 'active' : ''}`}>Home</span>
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item className="">
                    <Nav.Link href="#" className="d-flex align-items-center ps-0" onClick={
                        () => setActivePage('email')
                    }>
                        <Image className="text-secondary me-3"
                               src={Email}
                               width='28px'
                               height='29.51px'
                        />
                        <span className='side-bar-items active'>Email</span>
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item className="">
                    <Nav.Link href="#" className="d-flex align-items-center ps-0" onClick={
                        () => setActivePage('faq')
                    }>
                        <Image className="text-secondary me-3"
                               src={FAQ}
                               width='28px'
                               height='29.51px'
                        />
                        <span className='side-bar-items'>FAQ</span>
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item className="">
                    <Nav.Link href="#" className="d-flex align-items-center ps-0" onClick={
                        () => setActivePage('contact')
                    }>
                        <Image className="text-secondary me-3"
                               src={Contact}
                               width='28px'
                               height='29.51px'
                        />
                        <span className='side-bar-items'>Contact Us</span>
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item className="">
                    <Nav.Link href="#" className="d-flex align-items-center ps-0" onClick={
                        () => setActivePage('player')
                    }>
                        <Image className="text-secondary me-3"
                               src={Player}
                               width='28px'
                               height='29.51px'

                        />
                        <span className='side-bar-items'>Players</span>
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item className="">
                    <Nav.Link href="#" className="d-flex align-items-center ps-0" onClick={
                        () => setActivePage('settings')
                    }>
                        <Image className="text-secondary me-3"
                               src={Settings}
                               width='28px'
                               height='29.51px'
                        />
                        <span className='side-bar-items'>Settings</span>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item class=''>
                    <Nav.Link className='ps-0 w-100'>
                        <Image
                            src={Banner}
                            className='w-100'
                            style={{height:'213px'}}
                        />
                    </Nav.Link>

                </Nav.Item>
            </Nav>
         </Navbar>

    )
}