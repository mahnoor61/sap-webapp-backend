const User = require("../../models/user");
const Job = require('../../models/jobAssigning');
const ProductionOrderNo = require('../../models/productionOrder');

const {error_response, success_response} = require("../../utils/response");

exports.getOperatorProdcutionData = async (req, res) => {
    try {
        const {userName} = req.params;

        if (!userName) {
            return error_response(res, 400, 'Username is required!');
        }


        const user = await User.findOne({userName}).populate('role', 'name');

        let orders = [];

        if (user.role.name === 'operator') {
            const job = await Job.find({user: user._id});
            job.map(order => {
                orders.push(order.productionOrderNo);
            })

        }
        return success_response(res, 200, `Production order nos os this user ${userName} fetch successfully`, orders);
    } catch (error) {
        console.error(error);
        return error_response(res, 500, error.message);
    }
};
exports.updatemakeTime = async (req, res) => {
    try {
        const {
            docNum,
            makeTime
        } = req.body;

        if (!(docNum && makeTime)) {
            return error_response(res, 400, 'All inputs are required!');
        }


        const update = await ProductionOrderNo.findOne({docNum});

        if (!update) {
            return error_response(res, 400, 'Production order not find!');
        }

        update.makeTime = makeTime;
        update.status = 'running';
        await update.save();
        return success_response(res, 200, `Data updated successfully`, update);

    } catch (error) {
        console.error(error);
        return error_response(res, 500, error.message);
    }
};
exports.updatestartProductionTime = async (req, res) => {
    try {
        const {
            docNum,
            startProductionTime
        } = req.body;

        if (!(docNum && startProductionTime)) {
            return error_response(res, 400, 'All inputs are required!');
        }


        const update = await ProductionOrderNo.findOne({docNum});

        if (!update) {
            return error_response(res, 400, 'Production order not find!');
        }

        update.startProductionTime = startProductionTime;
        update.status = 'running';
        await update.save();
        return success_response(res, 200, `Data updated successfully`, update);

    } catch (error) {
        console.error(error);
        return error_response(res, 500, error.message);
    }
};
exports.updateRecievedByOperator = async (req, res) => {
    try {
        const {
            docNum,
            recievedByOperator
        } = req.body;


        if (!(docNum && recievedByOperator)) {
            return error_response(res, 400, 'All inputs are required!');
        }

        const update = await ProductionOrderNo.findOne({docNum});


        if (update.recievedByOperator + recievedByOperator > update.TransferredQuantity) {
            return error_response(res, 400, 'Recieve by operator is not exceed from transfered quantity!');
        }

        update.recievedByOperator += recievedByOperator;
        await update.save();

        return success_response(res, 200, `Recieved by operator  updated successfully`, update);

    } catch (error) {
        console.error(error);
        return error_response(res, 500, error.message);
    }
};