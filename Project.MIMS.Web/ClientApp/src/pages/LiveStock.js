import { Helmet } from 'react-helmet-async';
import React, { useEffect, useState } from 'react';
import { Container, Stack, Typography, Card, MenuItem, TextField, Button } from '@mui/material';
import { IconButton, Box } from '@material-ui/core';
import axios from 'axios';
import SearchNotFound from '../SearchNotFound';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link as RouterLink, useNavigate, useHref } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';
import { API_URL } from './configuration';

export default function LiveStock() {
    const navigate = useNavigate();
    const [openFilter, setOpenFilter] = useState(false);
    const [userId, setUserId] = useState(null);
    const [categoryCode, setCategoryCode] = useState("");
    const [subCategoryID, setSubCategoryID] = useState(0);
    const [categoryID, setCategoryID] = useState(0);
    const [itemSubCategoryList, setItemSubCategoryList] = useState([]);
    const [itemCategoryList, setItemCategoryList] = useState([]);
    const [dealerList, setDealerList] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [itemCode, setItemCode] = useState("");
    let encrypted = "";

    useEffect(() => {
        const userIdFromStorage = localStorage.getItem('userId');
        setUserId(userIdFromStorage);
        GetItemCategoryListForDropdown();
        GetDealerListForDropdown();
    }, []);

    useEffect(() => {
        if (categoryID !== 0) {
            GetItemSubCategoryListForDropdown(categoryID);
        }
    }, [categoryID]);

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

    const handleCategoryChange = (event) => {
        const value = event.target.value;
        setCategoryID(value);
        formik.setFieldValue('categoryID', value);
    };

    function handleClickEdit(subCategoryID) {
        navigate('/dashboard/SubCategoryAdd/' + subCategoryID)
    }

    const formik = useFormik({
        initialValues: {
            itemCode: itemCode,
            subCategoryID: subCategoryID,
            categoryID: categoryID
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
            itemCode: values.itemCode,
            subCategoryID: parseInt(values.subCategoryID),
            categoryID: values.categoryID
        }
        const result = await axios.post(API_URL + '/api/LiveStock/GetLiveStockDetails', model);
        setTableData(result.data.data);
        return;
    }

    async function handleClickDelete(subCategoryID) {
        const result = await axios.get(API_URL + '/api/Item/DeleteItemSubCategory', { params: { subCategoryID: parseInt(subCategoryID), userID: parseInt(userId) } });
        if (result.data.statusCode === "Error") {
            toast.error(result.data.message);
            return;
        }
        else {
            toast.success(result.data.message);
            let model = {
                itemCode: formik.values.itemCode,
                subCategoryID: formik.values.subCategoryID,
                categoryID: formik.values.categoryID
            }
            ItemSubCategoryDetailsGet(model)
        }
    }

    async function GetItemCategoryListForDropdown() {
        const result = await axios.get(API_URL + '/api/Item/GetItemCategoryListForDropdown');
        setItemCategoryList(result.data.data)
    }

    async function GetDealerListForDropdown() {
        const result = await axios.get(API_URL + '/api/Dealer/GetDealerListForDropdown');
        setDealerList(result.data.data)
    }

    async function GetItemSubCategoryListForDropdown(categoryID) {
        const result = await axios.get(API_URL + '/api/LiveStock/GetItemSubCategoryListBycategoryID', { params: {categoryID: parseInt(categoryID) } });
        setItemSubCategoryList(result.data.data)
    }

    function generateDropDownMenu(data) {
        let items = []
        if (data != null) {
            data.forEach(x => {
                items.push(x.isActive == true ? <MenuItem key={x.itemCategoryID} value={x.itemCategoryID}>{x.categoryName}</MenuItem> : null)
            });
        }
        return items
    }

    function generateDropDownMenuDealer(data) {
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
                    <title> Live Stock | MIMS </title>
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
                                    Live Stock
                                </Typography>
                            </Stack>
                            <br />
                            <Stack direction={{ xs: 'column', sm: 'row' }} style={{ marginTop: '25px' }} spacing={3}>
                            <TextField
                                select
                                fullWidth
                                size="small"
                                label="Category"
                                value={formik.values.categoryID}
                                onChange={handleCategoryChange}
                                error={Boolean(formik.touched.categoryID && formik.errors.categoryID)}
                                helperText={formik.touched.categoryID && formik.errors.categoryID}
                                sx={{ flex: 1 }}
                            >
                                <MenuItem key={0} value={0}>Select Item Category</MenuItem>
                                {generateDropDownMenu(itemCategoryList)}
                            </TextField>
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
                                    {generateDropDownMenuDealer(itemSubCategoryList)}
                                </TextField>
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
                                                        <TableCell align="center"><strong>Item Code</strong></TableCell>
                                                        <TableCell align="center"><strong>Received Date</strong></TableCell>
                                                        <TableCell align="center"><strong>Retail Price</strong></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {(rowsPerPage > 0
                                                        ? tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                        : tableData
                                                    )
                                                        .map((row) => {
                                                            return (
                                                                <TableRow key={row.itemCategoryID}>
                                                                    <TableCell align="center" component="th" scope="row">
                                                                        {row.itemCode}
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                        {row.receivedDate}
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                        {row.retailPrice}
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
