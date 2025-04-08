// const User = require('../../models/user');
//
// const {success_response, error_response} = require("../../utils/response");
//
// exports.create = async (req, res) => {
//     try {
//         const {userName, name, email, machineCode, role} = req.body;
//
//         if (!(userName && name && email && role)) {
//             return error_response(res, 400, "All inputs are required");
//         }
//
//         const existingUser = await User.findOne({email, role});
//
//         if (existingUser) {
//             return error_response(res, 400, "User already exist with this role");
//         }
//         const user = await User.create({
//             userName, name, email, machineCode, role
//         });
//
//         return success_response(res, 200, "User with role created successfully", user);
//     } catch (error) {
//         console.log(error);
//         return error_response(res, error.message);
//     }
// };


// exports.update = async (req, res) => {
//     try {
//         const {id} = req.params;
//         const {title, description, image} = req.body;
//
//         if (!title && description) {
//             return error_response(res, 400, "All inputs are required");
//         }
//
//         const expertise = await User.findById({_id: id});
//
//         if (!expertise) {
//             return error_response(res, 400, "User not found!");
//         }
//         //
//         // if (title && description) {
//             expertise.title = title;
//             expertise.description = description;
//         // }
//
//         if (req.file) {
//             expertise.image = req.file.path.substring(7);
//         }
//         await expertise.save();
//         return success_response(res, 200, "User updated successfully", expertise);
//     } catch (error) {
//         console.log(error);
//         return error_response(res, 500, error.message);
//     }
// };
//
// exports.destroy = async (req, res) => {
//     try {
//         const {id} = req.params;
//
//         const deleteExpertise = await User.findById({_id: id});
//
//         if (!deleteExpertise) {
//             return error_response(res, 400, "User not found!");
//         }
//         await deleteExpertise.deleteOne();
//         return success_response(res, 200, "User deleted successfully");
//     } catch (error) {
//         console.log(error);
//         return error_response(res, 500, error.message);
//     }
// };
//
// exports.all = async (req, res) => {
//     try {
//         const allExpertise = await User.find();
//
//         if (allExpertise.length > 0) {
//             return success_response(res, 200, "User fetch successfully", allExpertise);
//         }
//         return success_response(res, 200, "User not found!", []);
//     } catch (error) {
//         console.error(error);
//         return error_response(res, 500, error.message);
//     }
// }
//
// exports.read = async (req, res) => {
//     try {
//         const {id} = req.params;
//
//         const ReadExpertise = await User.findById({_id: id});
//
//         if (!ReadExpertise) {
//             return error_response(res, 400, "User not found!");
//         }
//
//         return success_response(res, 200, "User fetch successfully", ReadExpertise);
//     } catch (error) {
//         console.log(error);
//         return error_response(res, 500, error.message);
//     }
// }
