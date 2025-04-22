const User = require('../../models/user');
const jsonToken = require('jsonwebtoken');
const Machine = require('../../models/machine');
const Role = require('../../models/role');
const Job = require('../../models/jobAssigning');
const bcrypt = require('bcryptjs');
const {error_response, success_response} = require('../../utils/response');

exports.register = async (req, res) => {
    try {
        const {name, email, password, userName, role, machine} = req.body;
        const userData = await User.findOne({userName});

        if (userData) {
            return error_response(res, 400, "User already exit!");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create(
            {
                name,
                email,
                password: hashedPassword,
                userName
            });

        if (role) {
            newUser.role = role;
        }
        if (machine) {
            newUser.machine = machine;
        }

        await newUser.save();
        return success_response(res, 200, 'User Registered successfully', newUser)
    } catch (error) {
        console.error(error);
        return error_response(res, 500, error.message);
    }
}

// exports.verifyToken = async (req, res) => {
//     try {
//         const {token} = req.body;
//         const tokenValid = await Admin.findOne({token: token});
//
//         if (!tokenValid) {
//             return error_response(res, 400, "Token is not valid. Try again.")
//         }
//
//         return success_response(res, 200, 'Admin verified successfully');
//     } catch (error) {
//         console.error(error);
//         return error_response(res, 500, error.message);
//     }
// }

exports.login = async (req, res) => {
    try {
        const {userName, password} = req.body;
        const userData = await User.findOne({userName}).populate('role', 'name').populate('machine', 'name').exec();
        if (!userData) {
            return error_response(res, 400, 'User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, userData.password);

        if (!isPasswordValid) {
            return error_response(res, 400, 'Incorrect password');
        }

        const jwtToken = jsonToken.sign(
            {admin_id: userData._id},
            process.env.TOKEN_KEY,
            {
                expiresIn: "1y",
            }
        );
        // userData.token = jwtToken;
        const responseData = {
            _id: userData._id,
            name: userData.name,
            userName: userData.userName,
            email: userData.email,
            role: userData.role ? userData.role.name : null,
            machine: userData.machine
                ? {machineName: userData.machine.code}
                : null,
            token: jwtToken
        };

        return success_response(res, 200, 'Login successfully', responseData);
    } catch (error) {
        console.error(error);
        return error_response(res, 500, error.message);
    }
};

exports.auth = async (req, res) => {
    try {
        const admin = req.admin.admin_id;
        const adminData = await User.findById({_id: admin});

        if (!adminData) {
            return error_response(res, 400, 'User not found');
        }
        return success_response(res, 200, 'Auth is logged in.', adminData)
    } catch (error) {
        console.log(error)
        return error_response(res, 500, error.message);
    }
};

exports.changePassword = async (req, res) => {
    try {
        const adminId = req.admin.admin_id;
        const {oldPassword, newPassword} = req.body;
        const adminData = await User.findById({_id: adminId});

        if (!adminData) {
            return error_response(res, 400, "Admin not found");
        }

        const isPasswordValid = await bcrypt.compare(oldPassword, adminData.password);

        if (!isPasswordValid) {
            return error_response(res, 400, "Incorrect  password")
        }

        const salt = await bcrypt.genSalt(10);
        adminData.password = await bcrypt.hash(newPassword, salt);
        await adminData.save();

        return success_response(res, 200, 'Password changed successfully')
    } catch (error) {
        console.error(error);
        return error_response(res, 500, error.message);
    }
};

exports.changeEmail = async (req, res) => {
    try {
        const adminId = req.admin.admin_id;
        const {email, name} = req.body;

        const adminData = await User.findById({_id: adminId});

        if (!adminData) {
            return error_response(res, 400, "Admin not found!");
        }
        const updateEmail = await User.findByIdAndUpdate({_id: adminId}, {email, name}, {new: true});

        return success_response(res, 200, 'Email changed successfully', updateEmail)
    } catch (error) {
        console.error(error);
        return error_response(res, 500, error.message);
    }
};
exports.destroy = async (req, res) => {
    try {
        const {id} = req.params;

        const deleteUser = await User.findById({_id: id});
        if (!deleteUser) {
            return error_response(res, 400, "User not found!");
        }
        // Delete all jobs associated with the user
        await Job.deleteMany({user: deleteUser._id});
        await deleteUser.deleteOne();

        return success_response(res, 200, "User deleted successfully");
    } catch (error) {
        console.log(error);
        return error_response(res, 500, error.message);
    }
};
exports.allUsers = async (req, res) => {
    try {

        // const adminRole = await Role.findOne({name: 'admin'});
        //
        // if (!adminRole) {
        //     return error_response(res, 404, "Admin role not found!");
        // }

        // const allUsers = await User.find({role: {$ne: adminRole._id}}).sort({createdAt: -1}).populate('role', 'name').populate('machine', 'code').exec();
        const allUsers = await User.find().sort({createdAt: -1}).populate('role', 'name').populate('machine', 'code').exec();

        if (allUsers.length > 0) {
            return success_response(res, 200, "Users fetched successfully", allUsers);
        }
        return success_response(res, 200, "No users found!", []);
    } catch (error) {
        console.error(error);
        return error_response(res, 500, error.message);
    }
};

exports.updateUser = async (req, res) => {
    try {
        const {name, email, password, userName, role, machine} = req.body;
        const {id} = req.params;
        const userData = await User.findOne({_id: id});

        if (!userData) {
            return error_response(res, 400, "User not exit!");
        }

        if (name) {
            userData.name = name;
        }
        if (userName) {
            userData.userName = userName;
        }
        if (email) {
            userData.email = email;
        }
        if (role) {
            userData.role = role;
        }
        if (machine) {
            userData.machine = machine;
        }
        if (password) {
            const salt = await bcrypt.genSalt(10);
            userData.password = await bcrypt.hash(password, salt);
            // await userData.save();
        }
        await userData.save();
        return success_response(res, 200, 'User Updated successfully', userData)
    } catch (error) {
        console.error(error);
        return error_response(res, 500, error.message);
    }
}
exports.readUser = async (req, res) => {
    try {
        const {id} = req.params;
        const userData = await User.findOne({_id: id});

        if (!userData) {
            return error_response(res, 400, "User not exit!");
        }
        return success_response(res, 200, 'User get successfully', userData)
    } catch (error) {
        console.error(error);
        return error_response(res, 500, error.message);
    }
}