import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Input,
  Snackbar,
  Alert,
  TextField,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const UploadPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
    const {user} = useContext(AuthContext);
      const token = user?.token;
  // const token = localStorage.getItem("token");
  const MAX_VEDIO_SIZE_MB = 10;
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  let userId = null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    userId = payload?.nameidentifier;
  } catch (error) {
    console.error("Invalid token format", error);
  }

  const post = location.state?.post;
  const isEditing = !!post;

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [description, setDescription] = useState(post?.description || "");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    console.log(post);
    if (isEditing) {
      const preview = post.fileUrl || post.posrUrl;
      if (preview) {
        setPreviewUrl(preview);
      }
    }
  }, [isEditing, post]);

  useEffect(() => {
    return () => {
      if (previewUrl && file) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl, file]);

  // handel file input to upload image or video

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreviewUrl(selectedFile ? URL.createObjectURL(selectedFile) : null);
  };

  // handel upload button to submit post either new post or updated post
  const handleSubmit = async () => {
    if (!description.trim()) {
      setSnackbar({
        open: true,
        message: "Description is required.",
        severity: "warning",
      });
      return;
    }

    setLoading(true);
    const formData = new FormData();

    if (isEditing) {
      formData.append("PostId", post.id);
    } else {
      formData.append("UserId", userId);
    }

    if (file && file.size > MAX_VEDIO_SIZE_MB * 1024 * 1024) {
      setSnackbar({
        open: true,
        message: `File is too large. Max allowed size is ${MAX_VEDIO_SIZE_MB}MB.`,
        severity: "error",
      });
      setDescription("");
      setFile(null);
      setLoading(false);
      setPreviewUrl(null);
      return;
    }
    formData.append("Description", description);
    if (file) {
      formData.append("file", file);
    }

    try {
      const url = isEditing
        ? `http://glory-scout.tryasp.net/api/UserProfile/update-post/${post.id}`
        : `http://glory-scout.tryasp.net/api/UserProfile/create-post`;

      const method = isEditing ? "put" : "post";

      const res = await axios[method](url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        console.log(res);

        setFile(null);
        setPreviewUrl(null);
        setDescription("");
        setSnackbar({
          open: true,
          message: isEditing
            ? "Post updated successfully!"
            : "Post created successfully!",
          severity: "success",
        });

        setTimeout(
          () => navigate("/home/player", { state: { newPostAdded: true } }),
          2000
        );
      } else {
        throw new Error("Unexpected response");
      }
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: "Server error. Please try again later.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // how to preview image or vedio before create post
  const renderPreview = () => {
    if (!previewUrl) return null;

    if (
     file && file?.type?.startsWith("image/") ||
      previewUrl.match(/\.(jpeg|jpg|png|gif)$/)
    ) {
      return (
        <Box mt={2}>
          <Typography variant="subtitle1">Preview:</Typography>
          <img
            src={previewUrl}
            alt="Preview"
            style={{ maxWidth: "100%", borderRadius: 8 }}
          />
        </Box>
      );
    }

    if (
     file && file?.type?.startsWith("video/") ||
      previewUrl.match(/\.(mp4|webm|ogg)$/)
    ) {
      return (
        <Box mt={2}>
          <Typography variant="subtitle1">Preview:</Typography>
          <video controls width="100%" style={{ borderRadius: 8 }}>
            <source src={previewUrl} />
            Your browser does not support the video tag.
          </video>
        </Box>
      );
    }

    return (
      <Typography mt={2} color="warning.main">
        Preview not available.
      </Typography>
    );
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          backgroundColor: "#121212",
          color: "#fff",
          minHeight: "80vh",
          mt: 5,
          p: 4,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
          {isEditing ? "Edit Post" : "Create New Post"}
        </Typography>

        <Input
          type="file"
          onChange={handleFileChange}
          sx={{
            color: "#fff",
            mb: 2,
            backgroundColor: "#1e1e1e",
            p: 1,
            borderRadius: 1,
            width: "100%",
          }}
        />

        <TextField
          multiline
          rows={4}
          placeholder="Enter post description"
          variant="outlined"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{
            mb: 2,
            backgroundColor: "#1e1e1e",
            textarea: { color: "#fff" },
            "& .MuiInputBase-input": { color: "#fff" },
            "& .MuiInputLabel-root": { color: "#aaa" },
            borderRadius: 1,
          }}
        />

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#00ff40",
            color: "#000",
            "&:hover": {
              backgroundColor: "#00cc33",
            },
            px: 5,
            py: 1,
            fontWeight: "bold",
          }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "#00cc33" }} />
          ) : isEditing ? (
            "Save Changes"
          ) : (
            "Upload Post"
          )}
        </Button>

        {renderPreview()}

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert
            severity={snackbar.severity}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default UploadPage;


