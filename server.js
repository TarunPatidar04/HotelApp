//waiter===server
const express = require("express");
require("dotenv").config();
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");
app.use(bodyParser.json()); //req.body
const PORT=process.env.PORT || 3000

app.get("/", (req, res) => {
  res.send(
    "Welcome to our hotel"
  );
});

//import the router file
const personRoutes = require("./Routes/personRoute");
const menuRoutes = require("./Routes/menuRoutes");

// use the router
app.use("/person", personRoutes);
app.use("/menu", menuRoutes);


app.listen(PORT, () => {
  console.log(`server started ${PORT}`);
}); //room number
