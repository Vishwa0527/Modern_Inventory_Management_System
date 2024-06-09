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

export default function SubCategoryAddPage() {
    const navigate = useNavigate();
    const { subCategoryID } = useParams();
    const [userId, setUserId] = useState(null);
    const [isUpdate, setIsUpdate] = useState(false);
    const [itemCategoryList, setItemCategoryList] = useState([]);
    const [dealerList, setDealerList] = useState([]);
    const [formData, setFormData] = useState({
        subCategoryCode: '',
        subCategoryName: '',
        isActive: false,
        categoryID: '0',
        description: '',
        dealerID: '0'

    });
    useEffect(() => {
        const userIdFromStorage = localStorage.getItem('userId');
        setUserId(userIdFromStorage);
        GetItemCategoryListForDropdown();
        GetDealerListForDropdown();
        if (subCategoryID > 0) {
            setIsUpdate(true)
            GetItemCategoryDetailsByID(subCategoryID);
        } else {
            setIsUpdate(false)
        }
    }, []);

    const formik = useFormik({
        initialValues: {
            subCategoryName: formData.subCategoryName,
            subCategoryCode: formData.subCategoryCode,
            isActive: formData.isActive,
            categoryID: formData.categoryID,
            description: formData.description,
            dealerID: formData.dealerID
        },

        validationSchema: () => {
            return Yup.object().shape({
                subCategoryName: Yup.string().required("Please fill the Sub Category Name"),
                subCategoryCode: Yup.string().required("Please fill the Sub Category Code"),
                categoryID: Yup.number().min(1, 'Please Select Category').required('Category Required'),
                dealerID: Yup.number().min(1, 'Please Select Dealer').required('Dealer Required'),
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
                subCategoryID: parseInt(subCategoryID),
                subCategoryName: values.subCategoryName,
                subCategoryCode: values.subCategoryCode,
                isActive: values.isActive,
                categoryID: values.categoryID,
                description: values.description,
                dealerID: values.dealerID,
                createdBy: userId == null ? 0 : parseInt(userId)
            }

            const result = await axios.post('https://localhost:7211/api/Item/ItemSubCategorySave', model);
            if (result.data.statusCode === "Error") {
                toast.error(result.data.message);
                return;
            }
            else {
                toast.success(result.data.message, {
                    autoClose: 500,
                    onClose: () => navigate('/dashboard/SubCategory', { replace: true })
                });
            }
        } else {
            let model = {
                subCategoryID: parseInt(0),
                subCategoryName: values.subCategoryName,
                subCategoryCode: values.subCategoryCode,
                isActive: values.isActive,
                categoryID: values.categoryID,
                description: values.description,
                dealerID: values.dealerID,
                createdBy: userId == null ? 0 : parseInt(userId)
            }

            const result = await axios.post('https://localhost:7211/api/Item/ItemSubCategorySave', model);
            if (result.data.statusCode === "Error") {
                toast.error(result.data.message);
                return;
            }
            else {
                toast.success(result.data.message, {
                    autoClose: 500,
                    onClose: () => navigate('/dashboard/SubCategory', { replace: true })
                });
            }
        }
    }

    const { setValues, handleSubmit, getFieldProps, values } = formik;

    async function GetItemCategoryDetailsByID(subCategoryID) {
        const result = await axios.get('https://localhost:7211/api/Item/GetItemSubCategoryDetailsByID', { params: { subCategoryID: parseInt(subCategoryID) } });
        setValues({
            ...values,
            subCategoryCode: result.data.data.subCategoryCode,
            subCategoryName: result.data.data.subCategoryName,
            isActive: result.data.data.isActive,
            categoryID: result.data.data.categoryID,
            description: result.data.data.description,
            dealerID: result.data.data.dealerID
        })
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

    function handleClick() {
        navigate('/dashboard/SubCategory');
    }

    return (
        <Box mt={0}>
            <Card>
                <Helmet>
                    <title>{isUpdate ? "Update Sub Category | MIMS" : "Add Category | MIMS"}</title>
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
                                    {isUpdate ? "Update Sub Category" : "Add Sub Category"}
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
                                    label="Category *"
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
                                    label="Dealer *"
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
                                    label="Sub Category Name *"
                                    value={formik.values.subCategoryName}
                                    disabled={isUpdate}
                                    onChange={formik.handleChange}
                                    {...formik.getFieldProps('subCategoryName')}
                                    error={Boolean(formik.touched.subCategoryName && formik.errors.subCategoryName)}
                                    helperText={formik.touched.subCategoryName && formik.errors.subCategoryName}
                                    sx={{ flex: 1 }}
                                />

                            </Stack>
                            <Stack direction={{ xs: 'column', sm: 'row' }} style={{ marginTop: '25px' }} spacing={3}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Sub Category Code *"
                                    value={formik.values.subCategoryCode}
                                    disabled={isUpdate}
                                    onChange={formik.handleChange}
                                    {...formik.getFieldProps('subCategoryCode')}
                                    error={Boolean(formik.touched.subCategoryCode && formik.errors.subCategoryCode)}
                                    helperText={formik.touched.subCategoryCode && formik.errors.subCategoryCode}
                                    sx={{ flex: 1 }}
                                />
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    {...formik.getFieldProps('description')}
                                    error={Boolean(formik.touched.description && formik.errors.description)}
                                    helperText={formik.touched.description && formik.errors.description}
                                    sx={{ flex: 1 }}
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            value={formik.values.isActive}
                                            checked={formik.values.isActive}
                                            {...formik.getFieldProps('isActive')}
                                            onChange={formik.handleChange}
                                            color="error"
                                            name="isActive"
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                        />
                                    }
                                    label="Is Active"
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
                                    {isUpdate ? "Update" : "Save"}
                                </Button>
                            </Box>
                        </Form>
                    </FormikProvider>
                </CardContent>
            </Card>
        </Box>
    );
}
