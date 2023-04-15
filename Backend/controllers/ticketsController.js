const SeatsModel = require("../models/ticketsModel");

function findSubsetWithSum(arr, targetSum) {
  const n = arr.length;
  const dp = Array.from({ length: n + 1 }, () =>
    Array(targetSum + 1).fill(false)
  );

  // Base case: If sum is 0, empty subset is possible
  for (let i = 0; i <= n; i++) {
    dp[i][0] = true;
  }

  // DP bottom-up approach
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= targetSum; j++) {
      if (arr[i - 1][0] <= j) {
        dp[i][j] = dp[i - 1][j - arr[i - 1][0]] || dp[i - 1][j];
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }

  // Finding the minimum length subset
  const subset = [];
  let i = n;
  let j = targetSum;
  let count = 0;
  while (i > 0 && j > 0) {
    if (count >= 10 && i == n && j == targetSum) {
      break;
    }
    count++;
    if (dp[i - 1][j]) {
      i--;
    } else if (dp[i - 1][j - arr[i - 1][0]]) {
      subset.push(arr[i - 1]);
      j -= arr[i - 1][0];
      i--;
    }
  }
  if (subset.length == 0) {
    return false;
  }
  return subset.reverse();
}

async function getAllSeats(req, res) {
  try {

    //finding all seats
    const data = await SeatsModel.find();
    return res.status(200).send({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
}

async function bookSeats(req, res) {

  let seats = req.body.noOfSeats;

  // condition when seats are more than 7
  if (seats > 7) {
    return res.status(300).send({
      success: false,
      message: "you can book upto 7 seats at a time!",
    });
  }
  try {
    let allSeats = await SeatsModel.find();

    let data = {};
    let totalRows = null;
    allSeats.map((el) => {
      if (data[el.rowNumber] === undefined) {
        data[el.rowNumber] = [el.seatNumber, -1];
      } else {
        data[el.rowNumber] = [data[el.rowNumber][0], el?.seatNumber];
      }
      totalRows = el.rowNumber;
    });

    let max = Array(totalRows).fill(0);
    for (let i = 1; i <= totalRows; i++) {
      let count = 0;
      let seatstobeBooked = [];
      for (let j = data[i][0]; j <= data[i][1]; j++) {
        if (allSeats[j - 1]?.isAvailable == true) {
          count++;
          seatstobeBooked.push(allSeats[j - 1]);
        }

        // condition when we get required seats 
        if (count >= seats) {
          await SeatsModel.updateMany(

            // updating database
            { _id: { $in: seatstobeBooked.map((el) => el._id) } },
            { $set: { isAvailable: false } }
          );
          return res.status(200).send({
            success: true,
            message: "seats available for booking",
            data: seatstobeBooked,
          });
        }
      }
      max[i - 1] = [count, i];
      count = 0;
    }

    // finding nearby seats
    let availableSeats = findSubsetWithSum(max, seats);

    if (availableSeats === false) {
      return res.status(404).send({
        success: false,
        message: "requested no of seats not available together",
      });
    }
    let seatstobeBooked = [];
    for (let i = 0; i < availableSeats.length; i++) {
      let temp = allSeats.filter((el) => {
        if (el.rowNumber == availableSeats[i][1] && el.isAvailable == true) {
          return el;
        }
      });
      seatstobeBooked.push(...temp);
    }
    await SeatsModel.updateMany(
      { _id: { $in: seatstobeBooked.map((el) => el._id) } },
      { $set: { isAvailable: false } }
    );
    return res.status(200).send({
      success: true,
      message: "seats available for booking",
      data: seatstobeBooked,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
}

async function ResetSeats(req, res) {
    try {
        // Resetting all booked seats
        await SeatsModel.updateMany({isAvailable: true});
        return res.status(200).send({
          success: true,
          message: 'Seats have been reset'
        });
      } catch (error) {
        return res.status(500).send({
          success: false,
          message: error.message,
        });
      }
}

module.exports = { getAllSeats, bookSeats, ResetSeats };
