const Express = require('express');
const router = Express.Router();
const middleware = require('../../middleware/admin');

const {
    getOperatorProdcutionData, updatemakeTime, updateRecievedByOperator

} = require('../../controller/admin-panel/operator');


//sap connection route:
router.get('/production/orders/:userName', middleware, getOperatorProdcutionData);
router.post('/production/order/update/make-time', middleware, updatemakeTime);
router.post('/update/recieved-by-operator', middleware, updateRecievedByOperator);

module.exports = router;
