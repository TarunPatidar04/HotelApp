const express = require("express");

const router = express.Router();

const Person = require("../models/Person");

//POST route to add a person
router.post("/", async (req, res) => {
  try {
    const data = req.body; //Assuming the request body contains the person data

    //create a new person document using the Mongoose model
    const newPerson = new Person(data);

    // Save the new Person in database
    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET method to get person detail
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched", data);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; //  Extract the work type from the URL parameter
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("responsed fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, //Return the updated document
        runValidators: true, //Run Mongoose vaidators
      }
    );

    if (!response) {
      return res.status(404).json({ error: "Person not Found" });
    }
    console.log("data updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// //POST route to add a person
// app.post("/person", (req, res) => {
//   const data = req.body; //Assuming the request body contains the person data

//   //create a new person document using the Mongoose model
//   const newPerson = new Person(data);
//   // newPerson.name=data.name;
//   // newPerson.age=data.age;
//   // newPerson.mobile=data.mobile;
//   // newPerson.email=data.email;
//   // newPerson.address=data.address;
//   // newPerson.salary=data.salary;

//   // Save the new Person in databse
//   newPerson.save((error, savedPerson) => {
//     if (error) {
//       console.log("Error on Saving Person data", error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//     else{
//       console.log("data saved successfully");
//       res.status(200).json(savedPerson)
//     }
//   });
// });

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);

    if (!response) {
      return res.status(404).json({ error: "Person not Found" });
    }
    console.log("data Deleted");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
