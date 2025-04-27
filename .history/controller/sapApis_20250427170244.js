const { error_response, success_response } = require("../utils/response");

exports.sapLoginApi = async (req, res) => {
  try {
    const { CompanyDB, Password, UserName } = req.body;

      if (!(CompanyDB && Password && UserName)) {
         return error_response(res, 400, "All input are required!");
    }
    if (userData) {
      return error_response(res, 400, "User already exit!");
    }

    return success_response(res, 200, "Login into sap successfully");
  } catch (error) {
    console.error(error);
    return error_response(res, 500, error.message);
  }
};
