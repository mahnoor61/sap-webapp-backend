const { error_response, success_response } = require("../utils/response");

exports.sapLoginApi = async (req, res) => {
  try {
    const { name, email, password, userName, role, machine } = req.body;
    const userData = await User.findOne({ userName });

    if (userData) {
      return error_response(res, 400, "User already exit!");
    }


    return success_response(res, 200, "User Registered successfully", newUser);
  } catch (error) {
    console.error(error);
    return error_response(res, 500, error.message);
  }
};
