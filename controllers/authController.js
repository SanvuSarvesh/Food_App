const express = require('express');
const userModel = require('../models/userModel');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Register new user
const registerNewUser = async (request, response) => {
  try {
    const { username, email, password, firstname, mobileNo } = request.body;
    // checks for mandatory fields
    const missingFields = [];
    if (!username) missingFields.push('username');
    if (!email) missingFields.push('email');
    if (!password) missingFields.push('password');
    if (!firstname) missingFields.push('firstname');
    if (!mobileNo) missingFields.push('mobileNo');

    if (missingFields.length > 0) {
      return response.status(400).send({
        success: false,
        message: `Please provide the following mandatory fields: ${missingFields.join(', ')}`
      });
    }

    // checks for already existing user
    const alreadyExisting = await userModel.findOne({ email });
    if (alreadyExisting) {
      response.status(400).send({
        success: false,
        message: "User already exists."
      })
    }

    // Password Hashing
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //  creating new user
    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
      firstname,
      mobileNo
    });
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

    //Password check
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return response.status(401).send({
        success: false,
        message: "Incorrect Password, Please Retry."
      });
    }
    // creating JWT_Token 
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });
    user.password = undefined;
    response.status(200).send({
      success: true,
      message: "User login successful.",
      token,
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
