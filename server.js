const express = require('express')
const dotenv = require('dotenv')
const dbConnection = require('./config/database.js')
dotenv.config()
const app = express()

// Middleware
app.use(express.json())

// Database connection
dbConnection();
app.get("/", (request, response) =>{
  console.log("Food App...");
  response.status(200).send("Food app....");
})

app.use("/api/v1/user", require('./routes/routes.js'));
app.use("/api/v1/auth", require('./routes/authRoutes.js'));

const PORT = process.env.PORT;
app.listen(PORT, (request, response) =>{
  console.log("Application stated...")
})