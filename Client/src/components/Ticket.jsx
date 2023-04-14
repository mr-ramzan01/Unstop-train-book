import React, { useState } from "react";
import { Box, Button, Container, CssBaseline, TextField } from "@mui/material";

export const Ticket = () => {
  const [data, setData] = useState({seat: 'dfs'});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          padding: "20px",
          bgcolor: "#fff",
          borderRadius: "10px",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
          marginTop: 4,
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          display="flex"
          alignItems="center"
          gap="20px"
        >
          <TextField
            fullWidth
            name='seat'
            type="number"
            value={data.seat}
            placeholder="Enter no. of seats"
            sx={{
              width: "80%",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "transparent",
                },
                "&:hover fieldset": {
                  border: "#f1f1f1",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "transparent",
                },
              },
              bgcolor: "#f1f1f1",
              borderRadius: "5px",
              "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                {
                  display: "none",
                },
            }}
            inputProps={{
              maxLength: 10,
            }}
            InputProps={{
              style: {
                height: "50px",
              },
            }}
            onChange={handleChange}
          />
          <Button
            type="submit"
            size="large"
            variant="contained"
            sx={{
              boxShadow: "none",
              background: "#129ffd",
              "&:hover": {
                background: "#0066ff",
                boxShadow: "none",
              },
            }}
          >
            Book
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
