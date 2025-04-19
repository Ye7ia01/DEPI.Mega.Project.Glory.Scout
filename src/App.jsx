import { AuthContext, AuthProvider } from "./context/AuthContext.jsx";
import { Route, Routes } from "react-router-dom";
import { AuthenticatedNavBar } from "./components/AuthenticatedNavBar.jsx";
import { AuthenticatedSideBar } from "./components/AuthenticatedSideBar.jsx";
import { Col, Container, Row } from "react-bootstrap";
import collapse from "bootstrap/js/src/collapse.js";
import {useState} from "react";
import Contact from "./components/Contact";
import Home from "./Components/Home/Home.jsx";
import About from "./Components/About/About.jsx";
import {PlayersCoachesCard} from "./components/PlayersCoachesCard.jsx";
import {PlayersCoachesHomeScreen} from "./screens/PlayersCoachesHomeScreen.jsx";
import FAQ from "./Components/FAQ.jsx";
import PlayerProfile from "./Components/PlayerProfile.jsx";

function App() {
  const [collapsed, setCollapsed] = useState(false);


  return (
    <AuthProvider>
      <AuthenticatedNavBar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/FAQ" element={<FAQ/>}/>
        <Route path="/player" element={<PlayersCoachesHomeScreen dataType={'players'}/>}/>
        <Route path="/coach" element={<PlayersCoachesHomeScreen dataType={'coaches'}/>}/>
        <Route path="/player-profile" element={<PlayerProfile dataType={'players'}/>}/>
      </Routes>
      
    </AuthProvider>
  );

}

export default App;
