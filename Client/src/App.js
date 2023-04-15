import { Box, Typography } from "@mui/material";
import "./App.css";
import { Ticket } from "./components/Ticket";
import { Train } from "./components/Train";
import { useState } from "react";

function App() {
  const [isBooked, setIsBooked] = useState(false);
  return (
    <Box className="App">
      <Typography variant="h1" fontSize={"40px"} m={6}>
        My Ticket Book{" "}
      </Typography>
      <Ticket setIsBooked={setIsBooked} isBooked={isBooked} />
      <Train isBooked={isBooked} />
    </Box>
  );
}

export default App;
