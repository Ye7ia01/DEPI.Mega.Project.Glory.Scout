﻿import {Button, Image, Nav, Navbar} from "react-bootstrap";
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
import {NavbarLogo} from "./NavbarLogo.jsx";
import '../styles/Style.scss'


export const AuthenticatedSideBar = ({collapsed, setCollapsed}) => {

    const [visible, setVisible] = useState(true)
    const [activePage, setActivePage] = useState('players')


    return (
    <>
        <Navbar variant="dark" className="d-flex flex-column ps-4 align-items-start h-100 side-bar"
                style={{minHeight: '100vh'}}>
            <Nav className="d-flex flex-column justify-content-evenly">
                <p className="side-bar-text mt-3">Main Menu</p>
                <Nav.Item>
                    <Nav.Link href="#" className="d-flex align-items-center ps-0 " onClick={
                        () => setActivePage('home')
                    }>
                        <Image className={`me-3 svg-icon img-fluid ${activePage === 'home' ? 'svg-icon-active' : ''}`}
                               src={Home}
                               width='20px'
                               height='20px'
                        />
                        <span className={`side-bar-items ${activePage === 'home' ? 'active' : ''}`}>Home</span>
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item className="">
                    <Nav.Link href="#" className="d-flex align-items-center ps-0" onClick={
                        () => setActivePage('email')
                    }>
                        <Image
                               src={Email}
                               width='20px'
                               height='20px'
                               className={`me-3 svg-icon img-fluid ${activePage === 'email' ? 'svg-icon-active' : ''}`}
                        />
                        <span className={`side-bar-items ${activePage === 'email' ? 'active' : ''}`}>Email</span>
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item className="">
                    <Nav.Link href="#" className="d-flex align-items-center ps-0" onClick={
                        () => setActivePage('faq')
                    }>
                        <Image className={`me-3 svg-icon img-fluid ${activePage === 'faq' ? 'svg-icon-active' : ''}`}
                               src={FAQ}
                               width='20px'
                               height='20px'
                        />
                        <span className={`side-bar-items ${activePage === 'faq' ? 'active' : ''}`}>FAQ</span>
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item className="">
                    <Nav.Link href="#" className="d-flex align-items-center ps-0" onClick={
                        () => setActivePage('contact')
                    }>
                      <Image className={`me-3 svg-icon img-fluid ${activePage === 'contact' ? 'svg-icon-active' : ''}`}
                             src={Contact}
                             width='20px'
                             height='20px'
                      />

                        <span className={`side-bar-items ${activePage === 'contact' ? 'active' : ''}`}>Contact Us</span>
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item className="">
                    <Nav.Link href="#" className="d-flex align-items-center ps-0" onClick={
                        () => setActivePage('players')
                    }>
                        <Image className={`me-3 svg-icon img-fluid ${activePage === 'players' ? 'svg-icon-active' : ''}`}
                               src={Player}
                               width='20px'
                               height='20px'

                        />
                        <span className={`side-bar-items ${activePage === 'players' ? 'active' : ''}`}>Players</span>
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item className="">
                    <Nav.Link href="#" className="d-flex align-items-center ps-0" onClick={
                        () => setActivePage('settings')
                    }>
                        <Image className={`me-3 svg-icon img-fluid ${activePage === 'settings' ? 'svg-icon-active' : ''}`}
                               src={Settings}
                               width='20px'
                               height='20px'
                        />
                        <span className={`side-bar-items ${activePage === 'settings' ? 'active' : ''}`}>Settings</span>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className='ps-0 w-100'>
                        <Image
                            src={Banner}
                            className='w-100'
                            style={{height: '213px'}}
                        />
                    </Nav.Link>

                </Nav.Item>
            </Nav>
        </Navbar>
    </>
    )
}