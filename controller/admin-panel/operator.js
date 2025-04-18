const User = require("../../models/user");
const Job = require('../../models/jobAssigning');

const {error_response, success_response} = require("../../utils/response");

exports.getOperatorProdcutionData = async (req, res) => {
    try {
        const {userName} = req.params;

        if (!userName) {
            return error_response(res, 400, 'Username is required!');
        }

        const user = await User.findOne({userName}).populate('role', 'name');

        if (!user) {
            return error_response(res, 400, 'User not found!');
        }

        let job;
        if (user.role.name === 'operator') {
            job = await Job.find({
                user: user._id,
                status: {$ne: 'completed'}

            }).populate('productionOrderDataId').populate('machine', 'code').populate('route', 'code').populate('user', 'userName');
        }
        return success_response(res, 200, `Production order nos os this user ${userName} fetch successfully`, job);
    } catch (error) {
        console.error(error);
        return error_response(res, 500, error.message);
    }
};


exports.updatemakeTime = async (req, res) => {
    try {
        const {
            id,
            makeTime
        } = req.body;

        if (!(id && makeTime)) {
            return error_response(res, 400, 'All inputs are required!');
        }


        const update = await Job.findOne({_id: id});

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
    //when pause button is click start production time stroe and we stoe pause reason and change status in it
    try {
        const {
            id,
            startProductionTime,
            pauseReason
        } = req.body;

        if (!(id && startProductionTime && pauseReason)) {
            return error_response(res, 400, 'All inputs are required!');
        }


        const update = await Job.findOne({_id: id});

        if (!update) {
            return error_response(res, 400, 'Production order not find!');
        }

        update.startProductionTime = startProductionTime;
        update.pauseReason = pauseReason;
        update.status = 'paused';
        await update.save();
        return success_response(res, 200, `Data updated successfully`, update);

    } catch (error) {
        console.error(error);
        return error_response(res, 500, error.message);
    }
};
exports.updatePauseProductionTime = async (req, res) => {
    //when resume button is click  pause prodction time store and get strt production time from db
    try {
        const {
            id,
            pauseProductionTime,
        } = req.body;

        if (!(id && pauseProductionTime)) {
            return error_response(res, 400, 'All inputs are required!');
        }


        const update = await Job.findOne({_id: id});

        if (!update) {
            return error_response(res, 400, 'Production order not find!');
        }

        update.pauseProductionTime = pauseProductionTime;
        update.status = 'running';
        await update.save();
        return success_response(res, 200, `Data updated successfully`, update);

    } catch (error) {
        console.error(error);
        return error_response(res, 500, error.message);
    }
};
exports.updateStopProductionTime = async (req, res) => {
    //when stop button is click  image is store in db
    try {
        const {
            id,
            startProductionTime,
        } = req.body;

        if (!(id && startProductionTime)) {
            return error_response(res, 400, 'All inputs are required!');
        }


        const update = await Job.findOne({_id: id});

        if (!update) {
            return error_response(res, 400, 'Production order not find!');
        }

        update.startProductionTime = startProductionTime;
        update.status = 'completed';

        if (req.file) {
            update.stopReason = req.file.path.substring(7);
        }

        await update.save();
        return success_response(res, 200, `Data updated successfully`, update);

    } catch (error) {
        console.error(error);
        return error_response(res, 500, error.message);
    }
};
exports.updateDownTime = async (req, res) => {
    //when resume button is click  pause prodction time store and get strt production time from db
    try {
        const {
            id,
            startProductionTime,
            downTimeReason
        } = req.body;

        if (!(id && startProductionTime && downTimeReason)) {
            return error_response(res, 400, 'All inputs are required!');
        }


        const update = await Job.findOne({_id: id});

        if (!update) {
            return error_response(res, 400, 'Production order not find!');
        }

        update.startProductionTime = startProductionTime;
        update.downTimeReason = downTimeReason;
        update.status = 'downtime';
        await update.save();
        return success_response(res, 200, `Down time updated successfully`, update);

    } catch (error) {
        console.error(error);
        return error_response(res, 500, error.message);
    }
};
exports.saveDownTime = async (req, res) => {
    //when resume button is click  pause prodction time store and get strt production time from db
    try {
        const {
            id,
            downTime
        } = req.body;

        if (!(id && downTime)) {
            return error_response(res, 400, 'All inputs are required!');
        }

        const update = await Job.findOne({_id: id});

        if (!update) {
            return error_response(res, 400, 'Production order not find!');
        }

        update.downTime = downTime;
        update.status = 'running';
        await update.save();
        return success_response(res, 200, `Down time saves successfully`, update);

    } catch (error) {
        console.error(error);
        return error_response(res, 500, error.message);
    }
};
exports.getProductionTime = async (req, res) => {
    //when stop button is click  image is store in db
    try {
        const {
            id,

        } = req.params;


        const update = await Job.findOne({_id: id});

        if (!update) {
            return error_response(res, 400, 'Production order not find!');
        }
        const prodTime = update.startProductionTime;
        return success_response(res, 200, `Production time fetch  successfully`, prodTime);

    } catch (error) {
        console.error(error);
        return error_response(res, 500, error.message);
    }
};
exports.updateStatus = async (req, res) => {
    try {
        const {id, status} = req.body;

        if (!(id && status)) {
            return error_response(res, 400, 'All inputs are required!');
        }

        const job = await Job.findOne({_id: id});
        if (!job) {
            return error_response(res, 400, 'Job  not find!');
        }
        job.status = status;
        await job.save();

        return success_response(res, 200, `Status updated successfully`, job);

    } catch (error) {
        console.log(error);
        return error_response(res, 500, error.message);
    }

};
exports.getLastRouteOfProductionOrder = async (req, res) => {
    try {

        const {id} = req.params;

        const job = await Job.findOne({_id: id});

        if (!job) {
            return error_response(res, 400, 'Job  not find!');
        }

        const currentRoute = job.routeNo;


        const allJobs = await Job.find({productionOrderNo: job.productionOrderNo});

        const routes = allJobs.map(r => r.routeNo);

        const lastRouteNo = Math.max(...routes);

        const lastRoute = currentRoute === lastRouteNo

        return success_response(res, 200, `Get Last route confirmation  successfully`, {
            productionOrderNo: job.productionOrderNo,
            currentRoute,
            lastRoute: lastRouteNo,
            isCurrentRouteIsLastRoute: lastRoute
        });

    } catch (error) {
        console.log(error);
        return error_response(res, 500, error.message);
    }
}


exports.updateRecievedByOperator = async (req, res) => {
    try {
        let {
            recievedByOperator
        } = req.body;
        const {id} = req.params;

        if (!(recievedByOperator)) {
            return error_response(res, 400, 'All inputs are required!');
        }

        recievedByOperator = Math.abs(recievedByOperator);

        const update = await Job.findOne({_id: id}).populate('productionOrderDataId');

        if (update.recievedByOperator + recievedByOperator > update.productionOrderDataId.TransferredQuantity) {
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
exports.addIssueForMachine = async (req, res) => {
    try {
        let {issueForMachine, id} = req.body;

        if (!(issueForMachine && id)) {
            return error_response(res, 400, 'All inputs are required!');
        }

        issueForMachine = Math.abs(issueForMachine);

        const currentJob = await Job.findOne({
            _id: id
        })
            .populate('productionOrderDataId')
            .populate('user', 'userName')
            .populate('route', 'code')
            .populate('machine', 'code');


        if (!currentJob) {
            return error_response(res, 404, 'Job not found');
        }

        const issue = currentJob.issueForMachine;
        const completedQty = currentJob.completedQuantity;
        const wastedQty = currentJob.wastedQuantity;

        if (issue > completedQty + wastedQty) {
            return error_response(res, 400, 'Previous pallet is not completed yet. Complete or waste the remaining quantity first.');
        }

        currentJob.currentPallateNo += 1;
        currentJob.issueForMachine = issueForMachine;
        currentJob.completedQuantity = 0;
        currentJob.wastedQuantity = 0;
        currentJob.totalIssueForMachie += issueForMachine;

        await currentJob.save();

        return success_response(res, 200, 'Issue for machine added successfully', currentJob);
    } catch (error) {
        console.error(error);
        return error_response(res, 500, error.message);
    }
};
exports.addCompletedQuantity = async (req, res) => {
    try {

        let {completedQuantity, id} = req.body;

        if (!(completedQuantity && id)) {
            return error_response(res, 400, 'All inputs are required!');
        }

        const currentJob = await Job.findOne({
            _id: id
        })
            .populate('productionOrderDataId')
            .populate('user', 'userName')
            .populate('route', 'code')
            .populate('machine', 'code');


        if (!currentJob) {
            return error_response(res, 404, 'Job not found');
        }
        completedQuantity = Math.abs(completedQuantity);

        const totalCompleted = currentJob.completedQuantity + completedQuantity;
        const totalUsed = totalCompleted + currentJob.wastedQuantity;
        const issue = currentJob.issueForMachine;

        if (totalUsed > issue) {
            return error_response(res, 404, 'Completed + Wasted quantity cannot exceed issue for machine!');
        }

        currentJob.completedQuantity = totalCompleted;
        currentJob.totalCompletedQuantity += completedQuantity;
        await currentJob.save();

        return success_response(res, 200, 'Completed Quantity added successfully', currentJob);

    } catch (error) {
        console.log(error);
        return error_response(res, 500, error.message);
    }
};
exports.addWastedQuantity = async (req, res) => {
    try {

        let {wastedQuantity, id} = req.body;

        if (!(wastedQuantity && id)) {
            return error_response(res, 400, 'All inputs are required!');
        }

        const currentJob = await Job.findOne({
            _id: id
        })
            .populate('productionOrderDataId')
            .populate('user', 'userName')
            .populate('route', 'code')
            .populate('machine', 'code');


        if (!currentJob) {
            return error_response(res, 404, 'Job not found');
        }

        wastedQuantity = Math.abs(wastedQuantity);

        const totalWasted = currentJob.wastedQuantity + wastedQuantity;
        const totalUsed = totalWasted + currentJob.completedQuantity;
        const issue = currentJob.issueForMachine;

        if (totalUsed > issue) {
            return error_response(res, 404, 'Completed + Wasted quantity cannot exceed issue for machine!');
        }

        currentJob.wastedQuantity = totalWasted;
        currentJob.totalWastedQuantity += wastedQuantity;
        await currentJob.save();

        return success_response(res, 200, 'Wasted Quantity added successfully', currentJob);

    } catch (error) {
        console.log(error);
        return error_response(res, 500, error.message);
    }
};


exports.remainingQty = async (req, res) => {
    try {

        const {id} = req.params;

        if (!id) {
            return error_response(res, 400, 'Id is  required!');
        }

        const job = await Job.findOne({_id: id});

        if (!job) {
            return error_response(res, 400, 'This job not exist');
        }

        const remaningQty = Math.abs(job.recievedByOperator - job.totalIssueForMachie);
        job.remainingQuantity = remaningQty;
        await job.save();
        return success_response(res, 200, 'Remaining quantity get successfully', job);

    } catch (error) {
        console.log(error);
        return error_response(res, 500, error.message);
    }
};

exports.getCompletedQtyOfPreviousRoute = async (req, res) => {
    try {

        const {productionOrder, routeNo, id} = req.body;


        if (!(productionOrder && routeNo && id)) {
            return error_response(res, 400, 'All inputs are required!');
        }
        const previousRoute = routeNo - 1;

        const jobOfPreviousRoute = await Job.findOne({productionOrderNo: productionOrder, routeNo: previousRoute});

        if (!jobOfPreviousRoute) {
            return error_response(res, 400, 'Previous Route Not Found!');
        }

        const totalCompleteQtyOfPreviousRoute = jobOfPreviousRoute.totalCompletedQuantity;

        return success_response(res, 200, ' Total completed quantity of previous route fetch successfully', totalCompleteQtyOfPreviousRoute);
    } catch (error) {
        console.log(error);
        return error_response(res, 500, error.message);
    }
}