const { error_response, success_response } = require("../utils/response");
const axios = require("axios");

exports.sapLoginApi = async (req, res) => {
  try {
    const { CompanyDB, Password, UserName } = req.body;

    console.log("req.body", req.body);

    if (!(CompanyDB && Password && UserName)) {
      return error_response(res, 400, "All input are required!");
    }

    const sapLoginData = {
      CompanyDB,
      Password,
      UserName,
    };

    const loginUrl = process.env.SAP_LOGIN_URL;
    const sapResponse = await axios.post(
      loginUrl,
      sapLoginData, // yahan directly object
      {
        headers: {
          "Content-Type": "application/json",
          "B1S-WCFCompatible": "true",
        },
      }
    );

    return success_response(
      res,
      200,
      "Login into SAP successfully",
      sapResponse.data
    );
  } catch (error) {
    console.error(error);
    return error_response(res, 500, error.message);
  }
};
