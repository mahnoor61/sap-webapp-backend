const cron = require('node-cron');
const {fetchAndSyncSAPOrders} = require('./fetchProductionOrders');

cron.schedule('* * * * *', async () => {
    console.log("🕒 Running SAP Sync Job...,,,,,,, before");
    // await fetchAndSyncSAPOrders();
    console.log("🕒 Running SAP Sync Job......................after");
});
