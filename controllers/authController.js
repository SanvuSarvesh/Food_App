const express = require('express');
const userModel = require('../models/userModel');
const router = express.Router();

// Register new user
const registerNewUser = async (request, response) => {
  try {
    const { username, email, password, firstname, mobileNo } = request.body;
    // checks for mandatory fields
    if (!username || !email || !password || !firstname || !mobileNo) {
      response.status(400).send({
        success: false,
        message: "Please add the mandatory fields."
      })
    }

    // checks for already existing user
    const alreadyExisting = await userModel.findOne({ email });
    if (alreadyExisting) {
      response.status(400).send({
        success: false,
        message: "User already exists."
      })
    }

    //  creating new user
    const user = await userModel.create({ username, email, password, firstname, mobileNo });
    response.status(201).send({
      success: true,
      message: "User Created."
    })
  } catch (error) {
    console.error("Something went wrong :", error);
    response.status(500).send({
      success: false,
      message: "Unable to register."
    });
  }
}

// user login
const userLogin = async (request, response) => {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      return response.status(400).send({
        success: false,
        message: "Please provide email and password."
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return response.status(404).send({
        success: false,
        message: "User does not exist."
      });
    }

    if (user.password !== password) {
      return response.status(401).send({
        success: false,
        message: "Incorrect password."
      });
    }

    response.status(200).send({
      success: true,
      message: "User login successful.",
      user: { username: user.username, email: user.email }
    });
  } catch (error) {
    console.error("Something went wrong :", error);
    response.status(500).send({
      success: false,
      message: "Something went wrong..."
    });
  }
};

module.exports = { registerNewUser, userLogin };