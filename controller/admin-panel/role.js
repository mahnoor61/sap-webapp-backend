const Role = require('../../models/role');
const {success_response, error_response} = require("../../utils/response");

exports.createRoles = async (req, res) => {
    try {
        const {role} = req.body;

        if (!role) {
            return error_response(res, 400, "Role is required");
        }
        // const lowerCaseRole = role.toLowerCase();
        const existingRole = await Role.findOne({name: role.toLowerCase()});

        if (existingRole) {
            return error_response(res, 400, "This role already exist.");
        }
        const roles = await Role.create({
            name: role.toLowerCase()
        });
        return success_response(res, 200, "Role created successfully", roles);
    } catch (error) {
        console.log(error);
        return error_response(res, error.message);
    }
};
exports.allRoles = async (req, res) => {
    try {
        const allRoles = await Role.find().sort({createdAt:-1});

        if (allRoles.length > 0) {
            return success_response(res, 200, "Role fetch successfully", allRoles);
        }
        return success_response(res, 200, "Roles not found!", []);
    } catch (error) {
        console.error(error);
        return error_response(res, 500, error.message);
    }
}