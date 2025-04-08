const Job = require('../../models/jobAssigning');
const {success_response, error_response} = require("../../utils/response");
const User = require("../../models/user");


exports.createJob = async (req, res) => {
    try {
        const {productionOrderNo, machine, routeStage, user} = req.body;

        if (!(machine && productionOrderNo && routeStage && user)) {
            return error_response(res, 400, "All inputs are required");
        }

        const existingJob = await Job.findOne({
            productionOrderNo
        });

        if (existingJob) {
            return error_response(res, 400, "This job already exists for this user.");
        }

        // // Create new job
        const createJob = await Job.create({
            productionOrderNo,
            machine: machine,
            route: routeStage,
            user
        });

        // Fetch job again with populated data
        const populatedJob = await Job.findById(createJob._id)
            .populate('machine', 'code')
            .populate('route', 'code')
            .populate('user', 'userName');

        // console.log("populatedJob", populatedJob)

        // // Format response
        // let response = {
        //     _id: populatedJob._id,
        //     productionOrderNo: populatedJob.productionOrderNo,
        //     machine: populatedJob.machine ? populatedJob.machine.code : null,
        //     route: populatedJob.route ? populatedJob.route.code : null,
        //     user: populatedJob.user ? populatedJob.user.userName : null
        // }
        //
        return success_response(res, 200, "Job Assigned Successfully", populatedJob);

    } catch (error) {
        console.log(error);
        return error_response(res, 500, error.message);
    }
};


exports.allJobs = async (req, res) => {
    try {
        const all = await Job.find().sort({createdAt: -1}).populate('machine', 'code')
            .populate('route')
            .populate('user', 'userName').populate('user', 'userName');

        if (all.length > 0) {
            return success_response(res, 200, "Jobs fetch successfully", all);
        }
        return success_response(res, 200, "Jobs not found!", []);
    } catch (error) {
        console.error(error);
        return error_response(res, 500, error.message);
    }
};
exports.updateJob = async (req, res) => {
    try {
        const {productionOrderNo, machine, routeStage, user} = req.body;
        const {id} = req.params;


        // Check if job already exists for the same user and production order number
        const existingJob = await Job.findOne({
            _id: id
        });

        if (!existingJob) {
            return error_response(res, 400, "This job not exist.");
        }

        if (machine) {
            existingJob.machine = machine;
        }
        if (productionOrderNo) {
            existingJob.productionOrderNo = productionOrderNo;
        }
        if (routeStage) {
            existingJob.route = routeStage;
        }
        if (user) {
            existingJob.user = user;
        }
        await existingJob.save();
        return success_response(res, 200, "Job updated Successfully", existingJob);

    } catch (error) {
        console.log(error);
        return error_response(res, 500, error.message);
    }
};
exports.allSingleJobs = async (req, res) => {
    try {
        const {id} = req.params;
        const job = await Job.findOne({_id: id})
            .populate('machine', 'code')
            .populate('route')
            .populate('user', 'userName').populate('user', 'userName');

        if (!job) {
            return error_response(res, 400, "This job not exist.");
        }

        return success_response(res, 200, "Jobs found successfully", job);
    } catch (error) {
        console.error(error);
        return error_response(res, 500, error.message);
    }
};
exports.destroyJob = async (req, res) => {
    try {
        const {id} = req.params;

        const deleteJob = await Job.findById({_id: id});

        if (!deleteJob) {
            return error_response(res, 400, "Job not found!");
        }
        await deleteJob.deleteOne();
        return success_response(res, 200, "Job deleted successfully");
    } catch (error) {
        console.log(error);
        return error_response(res, 500, error.message);
    }
};