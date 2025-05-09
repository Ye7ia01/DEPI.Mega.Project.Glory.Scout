import { AuthContext, AuthProvider } from "./context/AuthContext.jsx";
import { Route, Routes} from "react-router-dom";
import { AuthenticatedNavBar } from "./Components/AuthenticatedNavBar.jsx";
import { useState, useContext } from "react";
import Contact from "./Components/Contact";
import Home from "./Components/Home/Home.jsx";
import About from "./Components/About/About.jsx";
import { PlayersCoachesHomeScreen } from "./screens/PlayersCoachesHomeScreen.jsx";
import FAQ from "./Components/FAQ.jsx";
import PlayerProfile from "./Components/PlayerProfile.jsx";
import PublicNavbar from "./Components/PublicNavbar.jsx";
import RegisterCoach from "./Components/Auth/RegisterCoach.jsx";
import RegisterPlayers from "./Components/Auth/RegisterPlayers.jsx";
import { Toaster } from "react-hot-toast";
import Footer from "./Components/Footer.jsx";
import Login from "./Components/Auth/Login.jsx";
import CreateNewPassword from "./Components/Auth/CreateNewPassword.jsx";
import ResetPassword from "./Components/Auth/ResetPassword.jsx";
import Layout from "./Components/Layout/Layout.jsx";
import UploadPage from "./Components/UploadPage.jsx";


function App() {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useContext(AuthContext);
  
  return (
    <AuthProvider>
      <Toaster/>
      {user ? (
        <AuthenticatedNavBar collapsed={collapsed} setCollapsed={setCollapsed} />
      ) : (
      // <Layout>
      //   <PlayerProfile/>
      // </Layout>
        <PublicNavbar />
      )}

      <Routes>
        {/*
          This route displays the main Layout containing the Sidebar.
          Any content within this route will be displayed inside the Layout.
        */}
        <Route path="/home" element={<Layout />}>
        <Route path="/home/player"  element={<PlayerProfile />} />
        <Route path="/home/faq"  element={<FAQ />} />
        <Route path="/home/email"  element={<Login />} />
        <Route path="/home/contact"  element={<Contact />} />
        {/* <Route path="/home/player"  element={<players />} /> */}
        <Route index  element={<PlayersCoachesHomeScreen dataType="players" />} />
        {/* <Route index  element={<PlayersCoachesHomeScreen />} /> */}
        </Route>

        {/* These routes will be divided between site visitors and registered users.
        Each group will be linked to a specific layout with its own access permissions. */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/register-coaches" element={<RegisterCoach />} />
        <Route path="/register-player" element={<RegisterPlayers />} />
        <Route path="/login" element={<Login />} />
        <Route path="/changepassword" element={<CreateNewPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        {/* <Route path="/coach" element={<PlayersCoachesHomeScreen dataType="coaches" />} /> */}
        {/* <Route path="/player-profile" element={<PlayerProfile dataType="players" />} /> */}
        {/* <Route path="/coach-profile" element={<PlayerProfile dataType="coaches" />} /> */}
        <Route path="/upload" element={<UploadPage/>}/>
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;