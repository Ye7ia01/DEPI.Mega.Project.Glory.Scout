import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Input,
  Snackbar,
  Alert,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const UploadPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token= " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJQbGF5ZXIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJlbWFuQHlhaG9vLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJFbWFuLWhhc2FuaWVuIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiJlNGE4OTlmZS1hZGMwLTRjOTUtNzg3NC0wOGRkODljNThkNzQiLCJleHAiOjE3NTAxMTE2NzEsImlzcyI6IlNlY3VyZUFwaSIsImF1ZCI6IlNlY3VyZUFwaVVzZXIifQ.VYqusqtRe1KxTM4hfIeJuWx-cIzzb0oooTrg9C7V2gc"
  const userId = JSON.parse(atob(token.split('.')[1]))?.nameidentifier;

  const post = location.state?.post;
  const isEditing = !!post;

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [description, setDescription] = useState(post?.description || "");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    if (isEditing && post.fileUrl) {
      setPreviewUrl(post.fileUrl);
    }
  }, [isEditing, post]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreviewUrl(selectedFile ? URL.createObjectURL(selectedFile) : null);
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    if (isEditing) {
      formData.append("PostId", post.id);
    } else {
      formData.append("UserId", userId); 
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
          Authorization: `Bearer ${token} `,
        },
      });

      if (res.status === 200) {
        setFile(null);
        setPreviewUrl(null);
        setDescription("");
        setSnackbar({
          open: true,
          message: isEditing ? "Post updated successfully!" : "Post created successfully!",
          severity: "success",
        });

       navigate("/player-profile", { state: { newPostAdded: true } });
      } else {
        setSnackbar({
          open: true,
          message: "Failed to process the request.",
          severity: "error",
        });
      }
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: "Server error. Please try again later.",
        severity: "error",
      });
    }
  };

  const renderPreview = () => {
    if (!previewUrl) return null;

    if (file?.type?.startsWith("image/") || previewUrl.match(/\.(jpeg|jpg|png|gif)$/)) {
      return (
        <Box mt={2}>
          <Typography variant="subtitle1">Preview:</Typography>
          <img src={previewUrl} alt="Preview" style={{ maxWidth: "100%", borderRadius: 8 }} />
        </Box>
      );
    }

    if (file?.type?.startsWith("video/") || previewUrl.match(/\.(mp4|webm|ogg)$/)) {
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
        >
          {isEditing ? "Save Changes" : "Upload Post"}
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

