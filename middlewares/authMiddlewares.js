const { response } = require('express');
const jwt = require('jsonwebtoken');

module.exports = async (request, response, next) => {
  try {
    // Get Token
    const authHeader = request.headers["authorization"];
    if (!authHeader) {
      return response.status(401).send({
        success: false,
        message: "Authorization header missing"
      });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return response.status(401).send({
        success: false,
        message: "Token missing"
      });
    }
    jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
      if (error) {
        return response.status(401).send({
          success: false,
          message: "Unauthorized user"
        });
      } else {
        request.user = decode;
        next();
      }
    })
  } catch (error) {
    console.log(error);
    response.status(401).send(
      success = false,
      message = "Something went wrong.",
      error
    )
  }
}