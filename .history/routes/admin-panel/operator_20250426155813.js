const Express = require('express');
const router = Express.Router();
const middleware = require('../../middleware/admin');
const uploadMiddleware = require('../../utils/upload');
const {
    getOperatorProdcutionData,
    updatemakeTime,
    updateRecievedByOperator,
    updatestartProductionTime,
    updatePauseProductionTime,updateIssueForMachine,
    // updateTransferedQuantity,,
    addIssueForMachine,
    addCompletedQuantity, saveDownTime,
    addWastedQuantity, updateStatus, getProductionTime, updateDownTime,
    remainingQty, getCompletedQtyOfPreviousRoute, updateStopProductionTime, getLastRouteOfProductionOrder
} = require('../../controller/admin-panel/operator');


//sap connection route:
router.get('/production/orders/:userName', middleware, getOperatorProdcutionData);
router.post('/production/order/update/make-time', middleware, updatemakeTime);
router.post('/production/order/update/production-time', middleware, updatestartProductionTime);
router.post('/production/order/update/pause-production-time', middleware, updatePauseProductionTime);
router.post('/update/recieved-by-operator/:id', middleware, updateRecievedByOperator);
// router.post('/update/transfered-quantity', middleware, updateTransferedQuantity);
router.post('/add/issue-for-machine', middleware, addIssueForMachine);
router.post('/update/issue-for-machine', middleware, updateIssueForMachine);
router.post('/add/completed-quantity', middleware, addCompletedQuantity);
router.post('/add/wasted-quantity', middleware, addWastedQuantity);
router.get('/get/remaining-quantity/:id', middleware, remainingQty);
router.post('/get/completed-quantity/previous-route', middleware, getCompletedQtyOfPreviousRoute);
router.post('/update/status', middleware, updateStatus);
router.get('/get/prodTime/:id', middleware, getProductionTime);
router.post('/update/downtime', middleware, updateDownTime);
router.post('/save/downtime', middleware, saveDownTime);
router.post('/save/prodTime/on-stop', middleware, uploadMiddleware('production').single('images'), updateStopProductionTime);


router.get('/get/last/route/:id', middleware, getLastRouteOfProductionOrder)
module.exports = router;
