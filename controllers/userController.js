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
module.exports = { userController }