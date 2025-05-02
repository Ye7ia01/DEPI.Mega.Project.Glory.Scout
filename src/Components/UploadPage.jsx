import React, { useContext, useState } from "react";
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
import { AuthContext } from "../context/AuthContext";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [description, setDescription] = useState("");
  const token =''
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setSnackbar({
        open: true,
        message: "Please select a file to upload.",
        severity: "error",
      });
      return;
    }

    const formData = new FormData();
    formData.append("UserId", "123e4567-e89b-12d3-a456-426614174000"); 
    formData.append("Description", description); 
    formData.append("file", file); 
       
       
    try {
      const res = await axios.post(
        "http://glory-scout.tryasp.net/api/UserProfile/create-post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
     
      

      if (res.status === 200) {
        console.log(formData);
        console.log(res);
        
        setSnackbar({
          open: true,
          message: "File uploaded successfully!",
          severity: "success",
        });
      } else {
        setSnackbar({
          open: true,
          message: "Upload failed.",
          severity: "error",
        });
      }
    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);
      setSnackbar({
        open: true,
        message: "Server error. Please try again.",
        severity: "error",
      });
    }
  };

  const renderPreview = () => {
    if (!previewUrl || !file) return null;

    const type = file.type;
    if (type.startsWith("image/")) {
      return (
        <Box mt={2}>
          <Typography variant="subtitle1">Image Preview:</Typography>
          <img
            src={previewUrl}
            alt="Preview"
            style={{ maxWidth: "100%", borderRadius: 8 }}
          />
        </Box>
      );
    } else if (type.startsWith("video/")) {
      return (
        <Box mt={2}>
          <Typography variant="subtitle1">Video Preview:</Typography>
          <video controls width="100%" style={{ borderRadius: 8 }}>
            <source src={previewUrl} type={type} />
            Your browser does not support the video tag.
          </video>
        </Box>
      );
    } else {
      return (
        <Typography mt={2} color="warning.main">
          Preview not available for this file type.
        </Typography>
      );
    }
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
          justifyContent: "center",
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
          Upload an Image or Video
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
          placeholder="Write a short description "
          variant="outlined"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{
            mb: 2,
            backgroundColor: "#1e1e1e",
            input: { color: "#fff" },
            textarea: { color: "#fff" },
            label: { color: "#aaa" },
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
          onClick={handleUpload}
        >
          Upload
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
