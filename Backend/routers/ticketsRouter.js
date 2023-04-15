const express = require("express");
const { getAllSeats, bookSeats, ResetSeats } = require("../controllers/ticketsController");

const SeatRouter = express.Router();

SeatRouter.get("/", getAllSeats);
SeatRouter.post("/book", bookSeats);
SeatRouter.post("/reset", ResetSeats);

module.exports = SeatRouter;
