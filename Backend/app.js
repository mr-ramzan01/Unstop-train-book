const express = require('express')
const cors = require('cors')


const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  try {
    res.send("In home");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
})




module.exports = app;
