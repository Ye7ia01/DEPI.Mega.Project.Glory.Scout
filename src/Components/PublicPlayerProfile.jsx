import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Alert,
  Button,
  Snackbar,
  Grid,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import PlayerPosts from "./PlayerPosts";
import { AuthContext } from "../context/AuthContext.jsx";

const PublicPlayerProfile = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const token = user?.token;
 
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userId, setuserId] = useState(null);
  const [postCount, setPostCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [isFollowing, setIsFollowing] = useState(false);


  useEffect(() => {
    if (id && token) fetchProfile();
  }, [id,token]);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://glory-scout.tryasp.net/api/SearchPages/players/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("player profile", response);
      setProfile(response?.data);
      setuserId(response?.data?.userId);

      console.log("id", id);
      console.log("userId", userId);
      
      

      // profile.userId -> Call /get-profile/{userId} : posts , followers

      setIsFollowing(response?.data?.isFollowing || false);
    } catch (err) {
      setError("Failed to load profile.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFollowToggle = async () => {
       console.log("userId",userId);
       
    try {
      const url = isFollowing
        ? `http://glory-scout.tryasp.net/api/UserProfile/unfollow/${userId}`
        : `http://glory-scout.tryasp.net/api/UserProfile/follow/${userId}`;
      const res = await axios.post(
        url, null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("response from followers", res);

      
      setIsFollowing((prevFollowing) => {
        const newFollowing = !prevFollowing;
        setFollowersCount((prev) => (newFollowing ? prev + 1 : prev - 1));
        return newFollowing;
      });
      setSnackbar({
        open: true,
        message: isFollowing
          ? "Unfollowed successfully."
          : "Followed successfully.",
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Action failed.",
        severity: "error",
      });
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container  sx={{ py: 4 }} className="profile-container w-full"   style={{ width: "90%" }}>
       
      <Box display="flex" alignItems="center" gap={4} ml={3} mt={2}>
        {/* صورة البروفايل */}
        {profile?.profilePhoto && (
          <CardMedia
            component="img"
            image={profile.profilePhoto}
            alt="Profile media"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #ccc",
            }}
          />
        )}

        {/* Posts & Followers */}
        <Box display="flex" gap={4}>
          {/* Posts */}
          <Box textAlign="center">
            <Typography variant="subtitle1" color="#3aff33">
              Posts
            </Typography>
            <Typography variant="h6" color="white">
              {postCount}
            </Typography>
          </Box>

          {/* Followers */}
          <Box textAlign="center">
            <Typography variant="subtitle1" color="#3aff33">
              Followers
            </Typography>
            <Typography variant="h6" color="white">
              {followersCount}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Buttons */}
      { profile?.userId && id && String(profile?.userId) !== String(id) && (
        <Box display="flex" gap={2} mt={2} marginLeft={"30px"}>
          <Button
            variant="contained"
            color={isFollowing ? "error" : "primary"}
            onClick={handleFollowToggle}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
          <Button 
            sx={{
                width: {
                  md: "30%",
                  sm: "50%"
                },
                padding:{
                  xs:" 5px 10px",
                  sm: "5px 10px ",
                  md: "10px 20px"
                },
                fontWeight: "bold",
                backgroundColor: "#e65100",
                color: "#fff",
                borderRadius: "4px",
                "&:hover": {
                  backgroundColor: "#bf360c", // لون أغمق عند الهوفر
                },
              
              }}
          >
            Request Details
          </Button>
        </Box>
      )}
      <PlayerPosts
        isEditable={false}
        playerId={userId}
        onDataLoaded={({ postsCount, followersCount }) => {
          setPostCount(postsCount);
          setFollowersCount(followersCount);
        }}
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Container>
  );
};

export default PublicPlayerProfile;
