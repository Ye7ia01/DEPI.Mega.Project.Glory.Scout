import { AuthContext, AuthProvider } from "./context/AuthContext.jsx";
import { Route, Routes } from "react-router-dom";
import { AuthenticatedNavBar } from "./components/AuthenticatedNavBar.jsx";
import { AuthenticatedSideBar } from "./components/AuthenticatedSideBar.jsx";
import { Col, Container, Row } from "react-bootstrap";
import collapse from "bootstrap/js/src/collapse.js";
import { useState } from "react";
import Contact from "./components/Contact";
import Home from "./Components/Home/Home.jsx";
import About from "./Components/About/About.jsx";

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <AuthProvider>
      <AuthenticatedNavBar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/contact" element={<Contact />}/>
      </Routes>
      
    </AuthProvider>
  );
}

export default App;
