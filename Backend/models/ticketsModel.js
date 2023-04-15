const mongoose = require("mongoose");

const seatsSchema = new mongoose.Schema(
  {
    rowNumber: {
      type: Number,
      required: true,
    },
    seatNumber: {
      type: Number,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const SeatsModel = mongoose.model("Seats", seatsSchema);

module.exports = SeatsModel;
