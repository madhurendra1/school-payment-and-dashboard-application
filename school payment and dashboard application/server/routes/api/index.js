const express= require('express');
const router = express.Router();
const TransactionController = require('../../controllers/TransactionController')
// Fetch all transactions
router.get('/transactions',TransactionController.getAllTransactions);
router.get('/transactions/school/:id',TransactionController.getAllSchoolTransactions);
router.get('/transactions/custom-order-id/:id',TransactionController.getTransactionStatusByCustomOrderID);


module.exports = router;
