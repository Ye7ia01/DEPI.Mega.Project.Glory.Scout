
import React, { useEffect, useState } from "react";
import ProfileImg from "../assets/PlayerProfile-img.png";
import { IoMdPersonAdd } from "react-icons/io";
import { MdOutlineWindow } from "react-icons/md";
import { Button, Container } from "@mui/material";
import { Link, useLocation } from "react-router";
import PlayerPosts from "./PlayerPosts";

const PlayerProfile = () => {

  const location = useLocation();
  const [refreshPosts, setRefreshPosts] = useState(false);

  useEffect(() => {
    if (location.state?.newPostAdded) {

      setRefreshPosts(true);
      window.history.replaceState({}, document.title);
    }
  }, [location]);
  
  return (
    <section className="profile-container text-white  w-full" style={{ width: "80%" }}>
      <div className="row player-info ps-5 pt-5 d-flex align-items-center ">
        <div className="col-sm-12 col-md-3 col-lg-3">
          <h3>Foad_ya2</h3>
          <img src={ProfileImg} alt="Profile image" />
        </div>

        <div className="info col-sm-12 col-md-4 col-lg-4 p-2 d-flex align-items-center justify-content-between">
          <div>
            <h6>1,134</h6>
            <p>Posts</p>
          </div>

          <div>
            <h6>839</h6>
            <p>Flowers</p>
          </div>

          <div>
            <h6>756</h6>
            <p>Following</p>
          </div>
        </div>
      </div>

      <div className="bio ps-5 pt-5">
        <h4>Foad ELhadidy</h4>
        <p className="p-3">
          A talented and dedicated football player with a strong passion for the
          game. Skilled in [position, e.g., striker, midfielder, defender], with
          exceptional [mention key strengths, e.g., dribbling, passing, speed,
          finishing]. Has experience playing at [mention level, e.g., club,
          academy, national team], with a track record of outstanding
          performances. Committed to continuous improvement, teamwork, and
          achieving success on and off the field.
        </p>
      </div>

      <div className="row profile-btns  ps-5">
        <div className="col-sm-12 col-md-4 mb-2">
          <button className="edit-btn w-100">Edit Profile</button>
        </div>

        <div className="col-sm-12 col-md-4 mb-2 ">
          <button className="request-btn w-100">Request Details</button>
        </div>

        <div className="col-sm-12 col-md-4 mb-2 d-flex justify-content-center align-items-center">
          <IoMdPersonAdd
            style={{
              width: 60,
              height: 30,
              borderWidth: 1,
              borderStyle: "solid",
              borderRadius: 4,
              padding: 5,
            }}
          />
        </div>

        <Container sx={{ mt: 3 }}>
          <Link to="/upload" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#fff",
                color: "#141414",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#e65100",
                },
              }}
            >
              Add Post
            </Button>
          </Link>
        </Container>

        <div>
          <MdOutlineWindow style={{ width: 50, height: 100 }} />
        </div>

        <PlayerPosts refresh={refreshPosts} onRefreshed={() => setRefreshPosts(false)}/>

      
      </div>
    </section>
  );
};

export default PlayerProfile;

