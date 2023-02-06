const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//Route file
const hospitals = require("./routes/hospitals");

//Load env vars
dotenv.config({ path: "./config/config.env" });
//connect to database

connectDB();
const app = express();
//Body parser
app.use(express.json());
app.use("/api/v1/hospitals", hospitals);

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log("Server running in", process.env.NODE_ENV, "mode on port", PORT)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  //close server and exit process
  server.close(() => process.exit(1));
});
