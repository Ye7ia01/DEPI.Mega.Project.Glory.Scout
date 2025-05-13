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
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    fetchProfile();

    if (id) fetchProfile();
  }, [id]);

 
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://glory-scout.tryasp.net/api/SearchPages/players/${id}`,{
          headers:{
              Authorization: `Bearer ${token}`,
          }
        }
      );
      console.log("player profile", response);
      setProfile(response?.data);
      setuserId(response?.data?.userId);
      console.log("id", id);
  
      // profile.userId -> Call /get-profile/{userId} : posts , followers

      setIsFollowing(response?.data?.isFollowing || false);
    } catch (err) {
      setError("Failed to load profile.", err);
      console.log(err);
      
    } finally {
      setLoading(false);
    }
  };

  const handleFollowToggle = async () => {
    try {
      const url = isFollowing
        ? `http://glory-scout.tryasp.net/api/UserProfile/unfollow/${userId}`
        : `http://glory-scout.tryasp.net/api/UserProfile/follow/${userId}`;
      await axios.post(
        url,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsFollowing(!isFollowing);
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
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" style={{color:"#fff", marginLeft:"30px"}} gutterBottom>
        {profile?.userName}
      </Typography>
      {/* Media */}
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
               marginLeft:"30px"
            }}
          sx={{ width: "100%", height: 300, objectFit: "cover", my: 2 }}
        />
      )}
      <Typography variant="body1" gutterBottom>
        {profile?.profileDescription}
      </Typography>
       
       
      
      {/* Buttons */}
      {String(userId) !== String(id) && (
        <Box display="flex" gap={2} mt={2} marginLeft={"30px"}>
          <Button
            variant="contained"
            color={isFollowing ? "error" : "primary"}
            onClick={handleFollowToggle}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
          <Button variant="outlined" color="secondary">
            Request Details
          </Button>
        </Box>
      )}
      <PlayerPosts isEditable={false} playerId={userId}/>
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
