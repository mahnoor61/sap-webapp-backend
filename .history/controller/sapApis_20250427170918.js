const { error_response, success_response } = require("../utils/response");

exports.sapLoginApi = async (req, res) => {
  try {
    const { CompanyDB, Password, UserName } = req.body;

    if (!(CompanyDB && Password && UserName)) {
      return error_response(res, 400, "All input are required!");
      }
      
      const sapLoginData = {
        CompanyDB,
        Password,,
      }; 

    const loginUrl = process.env.SAP_LOGIN_URL;
    const sapResponse = await axios.post(loginUrl, sapLoginData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    res.json(sapResponse.data);

    // return success_response(res, 200, "Login into sap successfully");
  } catch (error) {
    console.error(error);
    return error_response(res, 500, error.message);
  }
};
