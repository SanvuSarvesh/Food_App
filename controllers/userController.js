const userController = (request, response) => {
  try {
    response.status(200).send({
      success: true,
      message: 'User Created...'
    })
  } catch (error) {
    console.log(error)
  }

};

// Get User Details
const getUserInfo = async (request, response) =>{
  response.status(200).send("User Details");
};
module.exports = { userController, getUserInfo }