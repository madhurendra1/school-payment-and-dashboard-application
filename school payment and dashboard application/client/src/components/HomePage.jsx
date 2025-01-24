import React, { useState, useEffect } from 'react';
import { Box, Divider, Table, TableBody, TableCell, TableHead, TableRow, TablePagination, TextField, MenuItem, Typography } from '@mui/material';
import {Navbar} from './Navbar'
export const HomePage = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState('SUCCESS');
  const [dateFilter, setDateFilter] = useState({ start: '', end: '' });

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await fetch('http://localhost:8000/api/transactions');
      const data = await response.json();
      console.log('data come in response : '+JSON.stringify(data));
      setTransactions(data);
      setFilteredTransactions(data);
    };
    fetchTransactions();
  }, []);

  const handleFilter = () => {
    let filtered = transactions;

    if (statusFilter!='ALL') {
      filtered = filtered.filter(txn => txn.status === statusFilter);
    }else if(statusFilter=='ALL'){
      filtered=transactions;
    }

    if (dateFilter.start && dateFilter.end) {
      filtered = filtered.filter(txn => {
        const txnDate = new Date(txn.date);
        return txnDate >= new Date(dateFilter.start) && txnDate <= new Date(dateFilter.end);
      });
    }

    setFilteredTransactions(filtered);
  };

  useEffect(handleFilter, [statusFilter, dateFilter]);

  return (
    <Box>
      <Navbar/>
      <Box sx={{display:'flex', justifyContent:'space-between', margin:'25px 10px 10px', alignItems:'center'}}>
      <Typography variant='h5'>Transactions Overview</Typography>
      <Box sx={{display:'flex', justifyContent:'flex-end',}}>
        <TextField
          select
          label="status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ marginRight: '16px'}}
          size='small'
        >
          <MenuItem value="ALL">All</MenuItem>
          <MenuItem value="SUCCESS">success</MenuItem>
          <MenuItem value="PENDING">pending</MenuItem>
          <MenuItem value="FAILURE">failed</MenuItem>
        </TextField>
        <TextField
          type="date"
          label="Start Date"
          onChange={(e) => setDateFilter({ ...dateFilter, start: e.target.value })}
          InputLabelProps={{ shrink: true }}
          sx={{ marginRight: '16px'}}
          size='small'
        />
        <TextField
          type="date"
          label="End Date"
          onChange={(e) => setDateFilter({ ...dateFilter, end: e.target.value })}
          InputLabelProps={{ shrink: true }}
            size='small'
        />
      </Box>
      </Box>
      <Divider sx={{width:'100%'}}/>
      <Table>
        <TableHead>
          <TableRow >
            <TableCell  sx={{fontWeight:'700',fontSize:'15px'}}>S.NO.</TableCell>
            <TableCell sx={{fontWeight:'700',fontSize:'15px'}}>Collect ID</TableCell>
            <TableCell sx={{fontWeight:'700',fontSize:'15px'}}>School ID</TableCell>
            <TableCell sx={{fontWeight:'700',fontSize:'15px'}}>Gateway</TableCell>
            <TableCell sx={{fontWeight:'700',fontSize:'15px'}}>Order Amount</TableCell>
            <TableCell sx={{fontWeight:'700',fontSize:'15px'}}>Transaction Amount</TableCell>
            <TableCell sx={{fontWeight:'700', fontSize:'15px'}}>Status</TableCell>
            <TableCell sx={{fontWeight:'700',fontSize:'15px'}}>Custom Order ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTransactions.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((txn, index) => (
            <TableRow key={index}>
              <TableCell>{index+1}</TableCell>
              <TableCell  sx={{fontSize:'13px'}}>{txn.collect_id}</TableCell>
              <TableCell sx={{fontSize:'13px'}}>{txn.collect_request_data[0].school_id}</TableCell>
              <TableCell sx={{fontSize:'13px'}}>{txn.gateway}</TableCell>
              <TableCell sx={{fontSize:'13px'}}> &#8377;{txn.collect_request_data[0].order_amount}</TableCell>
              <TableCell sx={{fontSize:'13px'}}> &#8377;{txn.transaction_amount}</TableCell>
              <TableCell sx={{color:txn.status=='SUCCESS'?'green':'orange',fontSize:'13px'}}>{txn.status}</TableCell>
              <TableCell sx={{fontSize:'13px'}}>{txn.collect_request_data[0].custom_order_id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={filteredTransactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
      />
    </Box>
  );
};
