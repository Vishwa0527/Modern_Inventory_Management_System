import { Helmet } from 'react-helmet-async';
import React, { useEffect, useState } from 'react';
// @mui
import { Container, Stack, Typography, Card, MenuItem, TextField, Button } from '@mui/material';
import { IconButton, Box } from '@material-ui/core';
import axios from 'axios';
import Divider from '@mui/material/Divider';
import SearchNotFound from '../SearchNotFound';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import PropTypes, { func } from 'prop-types'
import { useTheme } from '@mui/material/styles'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { Link as RouterLink, useNavigate, useHref } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';

// ----------------------------------------------------------------------
function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

export default function ItemPage() {
    const navigate = useNavigate();
    const [openFilter, setOpenFilter] = useState(false);
    const [userId, setUserId] = useState(null);
    const [subCategoryID, setSubCategoryID] = useState(0);
    const [itemCode, setItemCode] = useState("");
    const [serialNumber, SetSSerialNumber] = useState("");
    const [itemSubCategoryList, setItemSubCategoryList] = useState([]);
    const [tableData, setTableData] = useState([]);

    let encrypted = "";

    useEffect(() => {
        const userIdFromStorage = localStorage.getItem('userId');
        setUserId(userIdFromStorage);
        GetItemSubCategoryListForDropdown();
    }, []);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    function handleClick() {
        var itemID = 0
        navigate('/dashboard/ItemAdd/' + itemID);
    }

    function handleClickEdit(itemID) {
        navigate('/dashboard/ItemAdd/' + itemID)
    }

    const formik = useFormik({
        initialValues: {
            subCategoryID: subCategoryID,
            itemCode: itemCode,
            serialNumber: serialNumber
        },

        validationSchema: () => {
            return Yup.object().shape({
            });
        },

        onSubmit: (values) => {
            ItemSubCategoryDetailsGet(values);
        }
    }
    );

    const { errors, touched, handleSubmit, getFieldProps, values } = formik;

    async function ItemSubCategoryDetailsGet(values) {
        let model = {
            subCategoryID: parseInt(values.subCategoryID),
            itemCode: values.itemCode,
            serialNumber: values.serialNumber
        }
        const result = await axios.post('https://localhost:7211/api/Item/GetItemsforListing', model);
        setTableData(result.data.data);
        return;
    }

    async function handleClickDelete(itemID) {
        const result = await axios.get('https://localhost:7211/api/Item/DeleteItem', { params: { itemID: parseInt(itemID), userID: parseInt(userId) } });
        if (result.data.statusCode === "Error") {
            toast.error(result.data.message);
            return;
        }
        else {
            toast.success(result.data.message);
            let model = {
                subCategoryID: formik.values.subCategoryID,
                itemCode: formik.values.itemCode,
                serialNumber: formik.values.serialNumber
            }
            ItemSubCategoryDetailsGet(model)
        }
    }

    async function GetItemSubCategoryListForDropdown() {
        const result = await axios.get('https://localhost:7211/api/Item/GetItemSubCategoryListForDropdown');
        setItemSubCategoryList(result.data.data)
    }

    function generateDropDownMenu(data) {
        let items = []
        if (data != null) {
            data.forEach(x => {
                items.push(x.isActive == true ? <MenuItem key={x.subCategoryID} value={x.subCategoryID}>{x.subCategoryName}</MenuItem> : null)
            });
        }
        return items
    }


    function handleClear() {
        setTableData([])
        formik.resetForm()
    }

    return (
        <Box mt={0}>
            <Card>
                <Helmet>
                    <title> Item | MIMS </title>
                </Helmet>
                <FormikProvider value={formik}>
                    <ToastContainer
                        position="bottom-right"
                        pauseOnHover
                    />
                    <Form
                        autoComplete="off"
                        disabled={!(formik.isValid && formik.dirty)}
                        noValidate
                        onSubmit={handleSubmit}
                    >
                        <Container>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" style={{ marginTop: '10px' }}>
                                <Typography variant="h6">
                                    Item
                                </Typography>
                                <Button variant="contained"
                                    onClick={handleClick}
                                ><AddIcon /></Button>
                            </Stack>
                            <br />
                            <Stack direction={{ xs: 'column', sm: 'row' }} style={{ marginTop: '25px' }} spacing={3}>
                                <TextField
                                    select
                                    fullWidth
                                    size="small"
                                    label="Sub Category"
                                    value={formik.values.subCategoryID}
                                    onChange={formik.handleChange}
                                    {...formik.getFieldProps('subCategoryID')}
                                    error={Boolean(formik.touched.subCategoryID && formik.errors.subCategoryID)}
                                    helperText={formik.touched.subCategoryID && formik.errors.subCategoryID}
                                    sx={{ flex: 1 }}
                                >
                                    <MenuItem key={0} value={0}> Select Item Sub Category</MenuItem>
                                    {generateDropDownMenu(itemSubCategoryList)}
                                </TextField>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Item Name"
                                    value={formik.values.itemName}
                                    onChange={formik.handleChange}
                                    {...formik.getFieldProps('itemName')}
                                    error={Boolean(formik.touched.itemName && formik.errors.itemName)}
                                    helperText={formik.touched.itemName && formik.errors.itemName}
                                    sx={{ flex: 1 }}
                                />
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Item Code"
                                    value={formik.values.itemCode}
                                    onChange={formik.handleChange}
                                    {...formik.getFieldProps('itemCode')}
                                    error={Boolean(formik.touched.itemCode && formik.errors.itemCode)}
                                    helperText={formik.touched.itemCode && formik.errors.itemCode}
                                    sx={{ flex: 1 }}
                                />
                            </Stack>
                            <Stack direction="row" alignItems="right" justifyContent="flex-end" mb={5} style={{ marginTop: '10px' }}>
                                <Button
                                    type="submit"
                                    size='small'
                                    variant="contained"
                                >
                                    {"Search"}
                                </Button>
                                <Button variant="outlined" style={{ marginLeft: '10px', color: 'red' }} onClick={handleClear}> Clear </Button>
                            </Stack>
                            {tableData.length == 0 ?
                                <SearchNotFound searchQuery="Sub Category" />
                                :
                                <Box
                                    display="flex"
                                    flexDirection={{ xs: 'column', sm: 'row' }}
                                    alignItems="center"
                                    justifyContent="center"
                                    spacing={1}
                                >
                                    <Card style={{ justifycontent: 'center', width: '85rem' }} >
                                        <TableContainer >
                                            <Table aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align="center"><strong>Sub Category</strong></TableCell>
                                                        <TableCell align="center"><strong>Item Name</strong></TableCell>
                                                        <TableCell align="center"><strong>Item Code</strong></TableCell>
                                                        <TableCell align="center"><strong>Serial Number</strong></TableCell>
                                                        <TableCell align="center"><strong>Retail Price</strong></TableCell>
                                                        <TableCell align="center"><strong>Selling Price</strong></TableCell>
                                                        <TableCell align="center"><strong>Status</strong></TableCell>
                                                        <TableCell align="center"><strong>Action</strong></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {(rowsPerPage > 0
                                                        ? tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                        : tableData
                                                    )
                                                        .map((row) => {
                                                            return (
                                                                <TableRow key={row.itemID}>
                                                                    <TableCell align="center" component="th" scope="row">
                                                                        {row.subCategoryName}
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                        {row.itemName}
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                        {row.itemCode}
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                        {row.serialNumber}
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                        {row.retailPrice}
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                        {row.sellingPrice}
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                        {row.isActive == true ? 'Active' : 'Inactive'}
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                        <IconButton aria-label="delete" size="small" onClick={() => handleClickEdit(row.itemID)}>
                                                                            <EditIcon />
                                                                        </IconButton>
                                                                        <IconButton aria-label="delete" size="small" onClick={() => handleClickDelete(row.itemID)}>
                                                                            <DeleteIcon style={{ color: 'red' }} />
                                                                        </IconButton>
                                                                    </TableCell>
                                                                </TableRow>
                                                            );
                                                        })}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Card>
                                </Box>
                            }
                        </Container >
                    </Form>
                </FormikProvider>
            </Card>
        </Box>
    );
}
