import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

export const Train = ({ isBooked }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSeats();
  }, [isBooked]);

  const getSeats = () => {
    setLoading(true);
    fetch(`http://localhost:8080/api/seats`)
      .then((res) => res.json())
      .then((res) => {
        const rows = [];
        for (let i = 0; i < 12; i++) {
          const val = res.data.filter((el) => el.rowNumber === i + 1);
          rows.push(val);
        }
        setData(rows);
      })
      .catch((err) => console.log(err, "response"))
      .finally(() => {
        setLoading(false);
      });
  };

  const handleReset = () => {
    setLoading(true);
    fetch(`http://localhost:8080/api/seats/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res, "response");
      })
      .catch((err) => console.log(err, "response"))
      .finally(() => {
        setLoading(false);
        getSeats();
      });
  };

  if (loading) {
    return <h4>Loading...</h4>;
  }

  return (
    <Box position="relative">
      <Box>
        <Box mt="20px" width="150px" ml="3rem" display="flex" gap="10px">
          <Box
            width="30px"
            height="30px"
            borderRadius="2px"
            bgcolor="#ff3944"
          ></Box>
          <Typography>Not Available</Typography>
        </Box>
        <Box mt="20px" ml="3rem" display="flex" gap="10px">
          <Box
            width="30px"
            borderRadius="2px"
            height="30px"
            bgcolor="#7ddaaa"
          ></Box>
          <Typography>Available</Typography>
        </Box>
      </Box>
      <Box display='flex' justifyContent='end' mr='3rem'>
        <Button onClick={handleReset} variant="outlined">
          Reset All tickets
        </Button>
      </Box>
      <Box
        border="1px solid black"
        borderRadius="20px"
        display="flex"
        justifyContent="space-between"
        gap="10px"
        p="20px"
        m="3rem"
        height="400px"
      >
        {data?.map((elem, i) => (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-around"
            gap="10px"
            key={i}
          >
            {elem.map((e) => (
              <Box
                key={e._id}
                sx={{ aspectRatio: "1/1", placeContent: "center" }}
                borderRadius="3px"
                bgcolor={e.isAvailable ? "#7ddaaa" : "#ff3944"}
                display="grid"
                width="50px"
                height="50px"
              >
                {e.seatNumber}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
