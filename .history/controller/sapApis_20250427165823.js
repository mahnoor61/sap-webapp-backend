
const {error_response, success_response} = require('../../utils/response');

exports.sapLogi = async (req, res) => {
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