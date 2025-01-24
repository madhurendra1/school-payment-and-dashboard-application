const Transaction = require('../models/Transaction');


module.exports.getAllTransactions=async (req, res)=>{
        try {
          console.log('transactions request come!');
      
          const transactions = await Transaction.aggregate([
            {
              $addFields: {
                collect_id_as_objectId: { $toObjectId: "$collect_id" }, // Convert collect_id to ObjectId
              },
            },
            {
              $lookup: {
                from: 'collect_request', // The name of the collection
                localField: 'collect_id_as_objectId', // Use the converted ObjectId field
                foreignField: '_id', // Field in collect_request
                as: 'collect_request_data', // Output array field
              },
            },
          ]);
      
          res.status(200).json(transactions);
        } catch (err) {
          console.error('Error fetching transactions:', err);
          res.status(500).json({ message: 'Error fetching transactions', error: err });
        }
}

module.exports.getAllSchoolTransactions=async (req, res)=>{
    try {
      console.log('getAllSchoolTransactions request come : '+ req.params.id);
  
      const transactions = await Transaction.aggregate([
        {
          $addFields: {
            collect_id_as_objectId: { $toObjectId: "$collect_id" }, // Convert collect_id to ObjectId
          },
        },
        {
          $lookup: {
            from: 'collect_request', // The name of the collection
            localField: 'collect_id_as_objectId', // Use the converted ObjectId field
            foreignField: '_id', // Field in collect_request
            as: 'collect_request_data', // Output array field
          },
        },
      ]);
      console.log('transactions in schoolwise : '+transactions )
      const filteredTransactions=transactions.filter((item)=>item.collect_request_data[0].school_id.toString()==req.params.id.toString())
      console.log('filteredTransactions : '+filteredTransactions )
      res.status(200).json(filteredTransactions);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      res.status(500).json({ message: 'Error fetching transactions', error: err });
    }
}

module.exports.getTransactionStatusByCustomOrderID=async (req, res)=>{
    try {
      console.log('getAllSchoolTransactions request come : '+ req.params.id);
  
      const transactions = await Transaction.aggregate([
        {
          $addFields: {
            collect_id_as_objectId: { $toObjectId: "$collect_id" }, // Convert collect_id to ObjectId
          },
        },
        {
          $lookup: {
            from: 'collect_request', // The name of the collection
            localField: 'collect_id_as_objectId', // Use the converted ObjectId field
            foreignField: '_id', // Field in collect_request
            as: 'collect_request_data', // Output array field
          },
        },
      ]);
      console.log('transactions in schoolwise : '+transactions )
      const filteredTransactions=transactions.filter((item)=>item.collect_request_data[0].custom_order_id.toString()==req.params.id.toString())
      console.log('filteredTransactions : '+filteredTransactions )
      res.status(200).json(filteredTransactions[0]);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      res.status(500).json({ message: 'Error fetching transactions', error: err });
    }
}