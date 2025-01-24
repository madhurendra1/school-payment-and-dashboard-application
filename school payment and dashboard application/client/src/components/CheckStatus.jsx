import { Box, Divider, Table, TableBody, TableCell, TableHead, TableRow, TablePagination, TextField, MenuItem, Typography, Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Navbar } from './Navbar';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { styled, alpha } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "lightblue",
    '&:hover': {
        backgroundColor: "lightblue",
    },
    borderRadius: '0px',
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '18ch',
            '&:focus': {
                width: '30ch',
            },
        },
    },
}));

export const CheckStatus = () => {
    const [searchedTrasaction, setSearchedTrasaction] = useState(undefined);
    const [searchedCustomOrderId, setSearchedCustomOrderId]= useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleCheckTransactionStatus = async ()=>{
        console.log('handleSearchSchoolTransactions clicked : '+ searchedCustomOrderId)
        const response = await fetch(`http://localhost:8000/api/transactions/custom-order-id/${searchedCustomOrderId}`);
        const data =await response.json();
        console.log('Searched School Transactions  : '+ JSON.stringify(data))
        setSearchedTrasaction(data);
        setSearchedCustomOrderId("")
    }
    useEffect(()=>{
        console.log('searchedTrasaction : '+JSON.stringify(searchedTrasaction))
    },[])
    return (
        <Box >
            <Navbar />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                <Box sx={{ width: { xs: '100vw', md: '95vw' }, border: '1px solid grey', margin: '15px 2px' }}>
                    <Box sx={{ padding: '0px 5px', margin: '10px 0px', display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant='h5'>Search by Custom Id :</Typography>
                        <Box sx={{ display: 'flex' }}>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Type Custom Order ID..."
                                    inputProps={{ 'aria-label': 'search' }}
                                    value={searchedCustomOrderId}
                                    onChange={(e)=>setSearchedCustomOrderId(e.target.value)}
                                />
                            </Search>
                            <Button size='small' onClick={handleCheckTransactionStatus} sx={{ backgroundColor: 'lightblue', borderLeft: '1px solid white', color: 'blue', textTransform: 'capitalize', borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }}>Search</Button>
                        </Box>
                    </Box>
                    <Divider sx={{ width: '100%' }} />
                    <Box >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Collect ID</TableCell>
                                    <TableCell>School ID</TableCell>
                                    <TableCell>Gateway</TableCell>
                                    <TableCell>Order Amount</TableCell>
                                    <TableCell>Transaction Amount</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Custom Order ID</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow >
                                    <TableCell>{searchedTrasaction?.collect_id}</TableCell>
                                    <TableCell>{searchedTrasaction?.collect_request_data[0].school_id}</TableCell>
                                    <TableCell>{searchedTrasaction?.gateway}</TableCell>
                                    <TableCell>{searchedTrasaction?.collect_request_data[0].order_amount}</TableCell>
                                    <TableCell>{searchedTrasaction?.transaction_amount}</TableCell>
                                    <TableCell sx={{ color: searchedTrasaction?.status == 'SUCCESS' ? 'green' : 'orange' }}>{searchedTrasaction?.status}</TableCell>
                                    <TableCell>{searchedTrasaction?.collect_request_data[0].custom_order_id}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <Box sx={{ display:searchedTrasaction?'none':'flex',justifyContent:'center',width: '100%'}}>
                            <Typography variant='h6' >Please Search a Transaction !</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
