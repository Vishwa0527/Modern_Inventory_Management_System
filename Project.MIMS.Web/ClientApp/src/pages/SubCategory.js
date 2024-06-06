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

export default function SubCategoryPage() {
    const navigate = useNavigate();
    const [openFilter, setOpenFilter] = useState(false);
    const [userId, setUserId] = useState(null);
    const [categoryCode, setCategoryCode] = useState("");
    const [dealerID, setDealerID] = useState(0);
    const [categoryID, setCategoryID] = useState(0);
    const [itemCategoryList, setItemCategoryList] = useState([]);
    const [dealerList, setDealerList] = useState([]);
    const [tableData, setTableData] = useState([]);
    console.log("tableData", tableData)
    let encrypted = "";

    useEffect(() => {
        const userIdFromStorage = localStorage.getItem('userId');
        setUserId(userIdFromStorage);
        GetItemCategoryListForDropdown();
        GetDealerListForDropdown();
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
        var subCategoryID = 0
        navigate('/dashboard/SubCategoryAdd/' + subCategoryID);
    }

    function handleClickEdit(subCategoryID) {
        navigate('/dashboard/SubCategoryAdd/' + subCategoryID)
    }

    const formik = useFormik({
        initialValues: {
            categoryCode: categoryCode,
            dealerID: dealerID,
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
            subCategoryCode: values.categoryCode,
            dealerID: values.dealerID,
            categoryID: values.categoryID
        }
        const result = await axios.post('https://localhost:7211/api/Item/GetItemSubCategoriesforListing', model);
        setTableData(result.data.data);
        return;
    }

    async function handleClickDelete(subCategoryID) {
        const result = await axios.get('https://localhost:7211/api/Item/DeleteItemSubCategory', { params: { subCategoryID: parseInt(subCategoryID), userID: parseInt(userId) } });
        if (result.data.statusCode === "Error") {
            toast.error(result.data.message);
            return;
        }
        else {
            toast.success(result.data.message);
            let model = {
                categoryCode: formik.values.categoryCode,
                dealerID: formik.values.dealerID,
                categoryID: formik.values.categoryID
            }
            ItemSubCategoryDetailsGet(model)
        }
    }

    async function GetItemCategoryListForDropdown() {
        const result = await axios.get('https://localhost:7211/api/Item/GetItemCategoryListForDropdown');
        setItemCategoryList(result.data.data)
    }

    async function GetDealerListForDropdown() {
        const result = await axios.get('https://localhost:7211/api/Dealer/GetDealerListForDropdown');
        setDealerList(result.data.data)
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
                items.push(x.isActive == true ? <MenuItem key={x.dealerID} value={x.dealerID}>{x.dealerName}</MenuItem> : null)
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
                    <title> Sub Category | MIMS </title>
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
                                    Sub Category
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
                                    label="Category "
                                    value={formik.values.categoryID}
                                    onChange={formik.handleChange}
                                    {...formik.getFieldProps('categoryID')}
                                    error={Boolean(formik.touched.categoryID && formik.errors.categoryID)}
                                    helperText={formik.touched.categoryID && formik.errors.categoryID}
                                    sx={{ flex: 1 }}
                                >
                                    <MenuItem key={0} value={0}> Select Item Category</MenuItem>
                                    {generateDropDownMenu(itemCategoryList)}
                                </TextField>
                                <TextField
                                    select
                                    fullWidth
                                    size="small"
                                    label="Dealer "
                                    value={formik.values.dealerID}
                                    onChange={formik.handleChange}
                                    {...formik.getFieldProps('dealerID')}
                                    error={Boolean(formik.touched.dealerID && formik.errors.dealerID)}
                                    helperText={formik.touched.dealerID && formik.errors.dealerID}
                                    sx={{ flex: 1 }}
                                >
                                    <MenuItem key={0} value={0}> Select Dealer</MenuItem>
                                    {generateDropDownMenuDealer(dealerList)}
                                </TextField>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Sub Category Code "
                                    value={formik.values.categoryCode}
                                    onChange={formik.handleChange}
                                    {...formik.getFieldProps('categoryCode')}
                                    error={Boolean(formik.touched.categoryCode && formik.errors.categoryCode)}
                                    helperText={formik.touched.categoryCode && formik.errors.categoryCode}
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
                                                        <TableCell align="center"><strong>Sub Category Code</strong></TableCell>
                                                        <TableCell align="center"><strong>Sub Category</strong></TableCell>
                                                        <TableCell align="center"><strong>Category</strong></TableCell>
                                                        <TableCell align="center"><strong>Dealer</strong></TableCell>
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
                                                                <TableRow key={row.itemCategoryID}>
                                                                    <TableCell align="center" component="th" scope="row">
                                                                        {row.subCategoryCode}
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                        {row.subCategoryName}
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                        {row.itemCategoryCode}
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                        {row.dealerName}
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                        {row.isActive == true ? 'Active' : 'Inactive'}
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                        <IconButton aria-label="delete" size="small" onClick={() => handleClickEdit(row.subCategoryID)}>
                                                                            <EditIcon />
                                                                        </IconButton>
                                                                        <IconButton aria-label="delete" size="small" onClick={() => handleClickDelete(row.subCategoryID)}>
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
