const userModel = require("../models/userModel");

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
const getUserInfo = async (request, response) => {
  const user = await userModel.findById(request.user.id);
  if (!user) {
    response.status(404).send({
      success: false,
      message: 'User Not Found.'
    })
  }
  user.password = undefined;
  response.status(200).send({
    success: true,
    message: 'User Details Fetched.',
    user
  });
};

// Update UserInfo
const updateUserInfo = async (request, response) => {
  try {
    const { userId } = request.params;
    const updateData = request.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return response.status(404).send({
        success: false,
        message: 'User Not Found.'
      });
    }

    // Update user fields (exclude password if not updating)
    const allowedUpdates = ['username', 'firstname', 'lastname', 'mobileNo', 'address'];
    allowedUpdates.forEach(field => {
      if (updateData[field] !== undefined) {
        user[field] = updateData[field];
      }
    });

    await user.save();

    user.password = undefined; // Hide password in response
    response.status(200).send({
      success: true,
      message: 'User Updated Successfully.',
      user
    });
  } catch (error) {
    console.error(error);
    response.status(500).send({
      success: false,
      message: 'Something went wrong.'
    });
  }
};
module.exports = { userController, getUserInfo, updateUserInfo }