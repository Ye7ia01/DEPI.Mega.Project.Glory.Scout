import React, {useContext, useEffect, useState} from "react";
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
import {AuthContext} from "../context/AuthContext.jsx";

const PublicPlayerProfile = () => {
  const { id } = useParams();
  const {user} = useContext(AuthContext);
  // const token = localStorage.getItem("token");
  const token = user?.token;
  // const userId = JSON.parse(atob(token.split(".")[1]))?.nameidentifier;
  const userId = JSON.parse(atob(token.split(".")[1]))?.nameidentifier;
  console.log("User ID : ",userId)
  console.log("Token : ",token)

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (id) fetchProfile();
  }, [id]);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://glory-scout.tryasp.net/api/SearchPages/players/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProfile(response?.data);

      // profile.userId -> Call /get-profile/{userId} : posts , followers

      setIsFollowing(response?.data?.isFollowing || false);
    } catch (err) {
      setError("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleFollowToggle = async () => {
    try {
      const url = isFollowing
        ? `http://glory-scout.tryasp.net/api/UserProfile/unfollow/${id}`
        : `http://glory-scout.tryasp.net/api/UserProfile/follow/${id}`;
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
      <Typography variant="h4" gutterBottom>
        {profile?.name}
      </Typography>
      {/* Media */}
      {profile?.mediaUrl && (
        <CardMedia
          component="img"
          image={profile.mediaUrl}
          alt="Profile media"
          sx={{ width: "100%", height: 300, objectFit: "cover", my: 2 }}
        />
      )}
      <Typography variant="body1" gutterBottom>
        {profile?.description}
      </Typography>

      {/* Buttons */}
      {String(userId) !== String(id) && (
        <Box display="flex" gap={2} mt={2}>
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
      <PlayerPosts isEditable={false} playerId={id} />
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
