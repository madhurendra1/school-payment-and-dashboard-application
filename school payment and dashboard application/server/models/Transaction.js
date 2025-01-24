const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  collect_id: { type: String, required: true },
  gateway: { type: String, required: true },
  transaction_amount: { type: Number, required: true },
  status: { type: String, required: true },
  payment_method: { type: String, required: true },
  bank_refrence: { type: String, required: true },
});

module.exports = mongoose.model('Transaction', TransactionSchema, 'collect_request_status');