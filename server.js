const cors = require("cors");
const express = require("express");
const mysql = require("mysql2");
const app = express();
app.use(express.json());
app.use(cors());
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "Joel@1234",
  database: "example",
});
db.connect((err) => {
  if (err) {
    console.log("Database Connection Failed..!", err);
  } else {
    console.log("Database Connected Successfully...");
  }
});
app.get("/getdata", (request, response) => {
  db.query("select * from users", (err, result) => {
    if (err) {
      response.send(err);
    } else {
      response.send(result);
    }
  });
});
app.get("/", (request, response) => {
  response.send({ message: "Hello" });
});

app.post("/getbynum", (req, res) => {
  const phonenumber = req.body.phoneNumber;
  db.query(
    "select * from users where phonenumber=?",
    phonenumber,
    (err, result) => {
      if (err) {
        res.send(500, "Rey internal server error ra, malli tarvatha ra." + err);
      } else {
        if (result.length == 0) {
          res.status(404).json(`Data not found for number ${phonenumber}`);
        } else {
          res.send(result);
        }
      }
    }
  );
});

app.post("/addperson", (req, res) => {
  const data = req.body;
  db.query("insert into users SET ?", data, (err, result) => {
    if (err) {
      res.status(500).json("Something went wrong", err);
    } else {
      res.status(201).json("Registered Successfully");
    }
  });
});

app.listen(4000, () => {
  console.log("Server started on port 4000");
});
