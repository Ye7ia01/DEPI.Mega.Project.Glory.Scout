import { AuthContext, AuthProvider } from "./context/AuthContext.jsx";
import { Route, Routes, useLocation } from "react-router-dom";
import { AuthenticatedNavBar } from "./components/AuthenticatedNavBar.jsx";
import { AuthenticatedSideBar } from "./components/AuthenticatedSideBar.jsx";
import { useState, useContext } from "react";
import Contact from "./components/Contact";
import Home from "./Components/Home/Home.jsx";
import About from "./Components/About/About.jsx";
import { PlayersCoachesHomeScreen } from "./screens/PlayersCoachesHomeScreen.jsx";
import FAQ from "./Components/FAQ.jsx";
import PlayerProfile from "./Components/PlayerProfile.jsx";
import PublicNavbar from "./Components/PublicNavbar.jsx";
import Footer from "./Components/Footer.jsx";


function App() {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useContext(AuthContext);
  const location = useLocation();


  return (
    <AuthProvider>
      {user ? (
        <AuthenticatedNavBar collapsed={collapsed} setCollapsed={setCollapsed} />
      ) : (
        <PublicNavbar />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/player" element={<PlayersCoachesHomeScreen dataType="players" />} />
        <Route path="/coach" element={<PlayersCoachesHomeScreen dataType="coaches" />} />
        <Route path="/player-profile" element={<PlayerProfile dataType="players" />} />
        <Route path="/coach-profile" element={<PlayerProfile dataType="coaches" />} />
    
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;