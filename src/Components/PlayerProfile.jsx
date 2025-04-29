import React from "react";
import ProfileImg from "../assets/PlayerProfile-img.png";
import { IoMdPersonAdd } from "react-icons/io";
import { MdOutlineWindow } from "react-icons/md";
import PlayerImg1 from "../assets/PlayerImg1.png";
import PlayerImg2 from "../assets/playerImg2.png";
import PlayerImg3 from "../assets/PlayerImg3.png";
import PlayerImg4 from "../assets/PlayerImg4.png";
import PlayerImg5 from "../assets/PlayerImg5.png";

const PlayerProfile = () => {
  const PlayerImgs = [
    {
      id: 1,
      image: PlayerImg1,
    },

    {
      id: 2,
      image: PlayerImg2,
    },

    {
      id: 3,
      image: PlayerImg3,
    },

    {
      id: 4,
      image: PlayerImg4,
    },
    {
      id: 5,
      image: PlayerImg5,
    },
    {
      id: 6,
      image: PlayerImg1,
    },

    {
      id: 7,
      image: PlayerImg2,
    },

    {
      id: 8,
      image: PlayerImg3,
    },

    {
      id: 9,
      image: PlayerImg4,
    },
    {
      id: 10,
      image: PlayerImg5,
    },
    {
      id: 11,
      image: PlayerImg1,
    },

    {
      id: 12,
      image: PlayerImg2,
    },

    {
      id: 13,
      image: PlayerImg3,
    },

    {
      id: 14,
      image: PlayerImg4,
    },
    {
      id: 15,
      image: PlayerImg5,
    },
  ];

  return (
    <section className="profile-container text-white">
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

        <div>
          <MdOutlineWindow style={{ width: 50, height: 100 }} />
        </div>

        <div className="player-images">
          <div className="row g-4 mx-auto">
            {PlayerImgs.map((img) => (
              <div key={img.id} className="col-sm-12 col-md-6 col-lg-3">
                <img src={img.image} alt="player image" className="w-100" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlayerProfile;
