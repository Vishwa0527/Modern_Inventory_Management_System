import { Helmet } from 'react-helmet-async';
import React, { useEffect, useState } from 'react';
// @mui
import { Stack, Typography, Card, TextField, Button, Switch, FormControlLabel } from '@mui/material';
import { IconButton, Box } from '@material-ui/core';
import axios from 'axios';
import Divider from '@mui/material/Divider';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import PropTypes, { func } from 'prop-types'
import { useTheme } from '@mui/material/styles'
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import CardContent from '@material-ui/core/CardContent';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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

export default function ItemAddPage() {
    const navigate = useNavigate();
    const { itemID } = useParams();
    const [userId, setUserId] = useState(null);
    const [isUpdate, setIsUpdate] = useState(false);
    const [itemSubCategoryList, setItemSubCategoryList] = useState([]);
    const [itemArrayList, setItemArrayList] = useState([]);
    const [formData, setFormData] = useState({
        subCategoryID: 0,
        itemName: '',
        itemCode: '',
        serialNumber: '',
        retailPrice: '',
        sellingPrice: ''
    });
    useEffect(() => {
        const userIdFromStorage = localStorage.getItem('userId');
        setUserId(userIdFromStorage);
        GetItemSubCategoryListForDropdown();
        if (itemID > 0) {
            setIsUpdate(true)
            GetItemDetailsByID(itemID);
        } else {
            setIsUpdate(false)
        }
    }, []);

    const formik = useFormik({
        initialValues: {
            subCategoryID: formData.subCategoryID,
            itemName: formData.itemName,
            itemCode: formData.itemCode,
            serialNumber: formData.serialNumber,
            retailPrice: formData.retailPrice,
            sellingPrice: formData.sellingPrice
        },

        validationSchema: () => {
            return Yup.object().shape({
                // subCategoryName: Yup.string().required("Please fill the Sub Category Name"),
                // subCategoryCode: Yup.string().required("Please fill the Sub Category Code"),
                subCategoryID: Yup.number().min(1, 'Please Select Sub Category').required('Sub Category Required'),
                // dealerID: Yup.number().min(1, 'Please Select Dealer').required('Dealer Required'),
            });
        },

        onSubmit: (values) => {
            SubmitForm(values);
        }
    }
    );

    async function SubmitForm(values) {
        if (isUpdate) {
            let model = {
                ItemID: parseInt(itemID),
                subCategoryID: values.subCategoryID,
                itemName: values.itemName,
                itemCode: values.itemCode,
                serialNumber: values.serialNumber,
                retailPrice: values.retailPrice,
                sellingPrice: values.sellingPrice,
                createdBy: userId == null ? 0 : parseInt(userId)
            }

            const result = await axios.post('https://localhost:7211/api/Item/ItemUpdate', model);
            if (result.data.statusCode === "Error") {
                toast.error(result.data.message);
                return;
            }
            else {
                toast.success(result.data.message, {
                    autoClose: 500,
                    onClose: () => navigate('/dashboard/Item', { replace: true })
                });
            }
        } else {
            let model = {
                ItemID: parseInt(0),
                subCategoryID: parseInt(values.subCategoryID),
                itemName: values.itemName,
                itemCode: values.itemCode,
                serialNumber: values.serialNumber,
                retailPrice: parseFloat(values.retailPrice),
                sellingPrice: parseFloat(values.sellingPrice),
                createdBy: userId == null ? 0 : parseInt(userId)
            }
            setItemArrayList(itemArrayList => [...itemArrayList, model]);

            ClearFields()
        }
    }

    const { setValues, handleSubmit, getFieldProps, values } = formik;

    async function GetItemDetailsByID(itemID) {
        const result = await axios.get('https://localhost:7211/api/Item/GetItemDetailsByID', { params: { itemID: parseInt(itemID) } });
        setValues({
            ...values,
            subCategoryID: result.data.data.subCategoryID,
            itemName: result.data.data.itemName,
            itemCode: result.data.data.itemCode,
            serialNumber: result.data.data.serialNumber,
            retailPrice: result.data.data.retailPrice,
            sellingPrice: result.data.data.sellingPrice
        })
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

    async function SaveItemDetails() {
        const result = await axios.post('https://localhost:7211/api/Item/ItemSave', itemArrayList);
        if (result.data.statusCode === "Error") {
            toast.error(result.data.message);
            return;
        }
        else {
            toast.success(result.data.message, {
                autoClose: 500,
                onClose: () => navigate('/dashboard/Item', { replace: true })
            });
        }
    }

    function handleClick() {
        navigate('/dashboard/Item');
    }

    function ClearFields() {
        formik.resetForm()
    }

    const handleClickDelete = (index) => {
        const newArray = [...itemArrayList];
        newArray.splice(index, 1);
        setItemArrayList(newArray);
    };

    return (
        <Box mt={0}>
            <Card>
                <Helmet>
                    <title>{isUpdate ? "Update Item | MIMS" : "Add Item | MIMS"}</title>
                </Helmet>
                <Divider />
                <CardContent>
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
                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                <Typography variant="h6">
                                    {isUpdate ? "Update Item" : "Add Item"}
                                </Typography>
                                <Button variant="contained"
                                    onClick={handleClick}><ArrowBackIcon /></Button>
                            </Stack>
                            <br />
                            <Stack direction={{ xs: 'column', sm: 'row' }} style={{ marginTop: '25px' }} spacing={3}>
                                <TextField
                                    select
                                    fullWidth
                                    size="small"
                                    label="Sub Category *"
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
                                    label="Item Name *"
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
                                    label="Item Code *"
                                    value={formik.values.itemCode}
                                    disabled={isUpdate}
                                    onChange={formik.handleChange}
                                    {...formik.getFieldProps('itemCode')}
                                    error={Boolean(formik.touched.itemCode && formik.errors.itemCode)}
                                    helperText={formik.touched.itemCode && formik.errors.itemCode}
                                    sx={{ flex: 1 }}
                                />
                            </Stack>
                            <Stack direction={{ xs: 'column', sm: 'row' }} style={{ marginTop: '25px' }} spacing={3}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Serial Number *"
                                    value={formik.values.serialNumber}
                                    disabled={isUpdate}
                                    onChange={formik.handleChange}
                                    {...formik.getFieldProps('serialNumber')}
                                    error={Boolean(formik.touched.serialNumber && formik.errors.serialNumber)}
                                    helperText={formik.touched.serialNumber && formik.errors.serialNumber}
                                    sx={{ flex: 1 }}
                                />
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Retail Price *"
                                    value={formik.values.retailPrice}
                                    onChange={formik.handleChange}
                                    {...formik.getFieldProps('retailPrice')}
                                    error={Boolean(formik.touched.retailPrice && formik.errors.retailPrice)}
                                    helperText={formik.touched.retailPrice && formik.errors.retailPrice}
                                    sx={{ flex: 1 }}
                                />
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Selling Price *"
                                    value={formik.values.sellingPrice}
                                    onChange={formik.handleChange}
                                    {...formik.getFieldProps('sellingPrice')}
                                    error={Boolean(formik.touched.sellingPrice && formik.errors.sellingPrice)}
                                    helperText={formik.touched.sellingPrice && formik.errors.sellingPrice}
                                    sx={{ flex: 1 }}
                                />

                            </Stack>
                            <Box display="flex" justifyContent="flex-end" p={2}>
                                <Button
                                    color="primary"
                                    type="submit"
                                    size='small'
                                    variant="contained"
                                >
                                    {isUpdate ? "Update" : "Add"}
                                </Button>
                                <Button variant="outlined" style={{ marginLeft: '10px', color: 'red' }} onClick={ClearFields} hidden={isUpdate}> Clear </Button>
                            </Box>
                        </Form>
                    </FormikProvider>
                    {itemArrayList.length == 0 ? null :
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
                                                <TableCell align="center"><strong>Item Name</strong></TableCell>
                                                <TableCell align="center"><strong>Serial Number</strong></TableCell>
                                                <TableCell align="center"><strong>Retail Price</strong></TableCell>
                                                <TableCell align="center"><strong>Selling Price</strong></TableCell>
                                                <TableCell align="center"><strong>Action</strong></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {itemArrayList.map((row, index) => {
                                                return (
                                                    <TableRow key={row.itemCategoryID}>
                                                        <TableCell align="center" component="th" scope="row">
                                                            {row.itemCode}
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            {row.itemName}
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
                                                            <IconButton aria-label="delete" size="small" onClick={() => handleClickDelete(index)}>
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
                    {itemArrayList.length == 0 ? null :
                        <Box display="flex" justifyContent="flex-end" p={2}>
                            <Button
                                color="primary"
                                size='small'
                                variant="contained"
                                hidden={isUpdate}
                                onClick={() => SaveItemDetails()}
                            >
                                {'Save'}
                            </Button>
                        </Box>}
                </CardContent>
            </Card>
        </Box>
    );
}
