//waiter===server
const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");
app.use(bodyParser.json()); //req.body

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

app.listen(3000, () => {
  console.log("server started");
}); //room number
