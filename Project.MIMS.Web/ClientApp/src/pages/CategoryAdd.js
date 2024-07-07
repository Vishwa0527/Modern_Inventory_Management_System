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
import { API_URL } from './configuration';

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

export default function CategoryAddPage() {
    const navigate = useNavigate();
    const { itemCategoryID } = useParams();
    const [userId, setUserId] = useState(null);
    const [isUpdate, setIsUpdate] = useState(false);
    const [admin, setIsAdmin] = useState(false);
    const [companyList, setComanyList] = useState([]);
    const [salesPointList, setSalesPointList] = useState([]);
    const [userCompanyID, setUserCompanyID] = useState(0);
    const [userSalesPointID, setUserSalesPointID] = useState(0);

    const [formData, setFormData] = useState({
        categoryCode: '',
        categoryName: '',
        isActive: false,
        companyID: 0,
        salesPointID: 0

    });

    useEffect(() => {
        const userIdFromStorage = localStorage.getItem('userId');
        const userTypeFromStorage = localStorage.getItem('userType');
        const companyIDFromStorage = localStorage.getItem('companyID');
        const salesPointIDFromStorage = localStorage.getItem('salesPointID');

        setUserCompanyID(parseInt(companyIDFromStorage));
        setUserSalesPointID(parseInt(salesPointIDFromStorage))

        setFormData({
            ...formData,
            companyID: parseInt(companyIDFromStorage),
            salesPointID: parseInt(salesPointIDFromStorage)
        })
        if (userTypeFromStorage == 2) {
            setIsAdmin(true)
        }
        setUserId(userIdFromStorage);
        GetComanyListForDropdown();
        if (itemCategoryID > 0) {
            setIsUpdate(true)
            GetItemCategoryDetailsByID(itemCategoryID);
        } else {
            setIsUpdate(false)
        }
    }, []);

    const formik = useFormik({
        initialValues: {
            categoryName: formData.categoryName,
            categoryCode: formData.categoryCode,
            isActive: formData.isActive,
            companyID: formData.companyID,
            salesPointID: formData.salesPointID
        },

        validationSchema: () => {
            return Yup.object().shape({
                categoryName: Yup.string().required("Please fill the category name"),
                categoryCode: Yup.string().required("Please fill the category code"),
                companyID: Yup.number().min(1, 'Please Select Company').required('Company Required'),
                salesPointID: Yup.number().min(1, 'Please Select SalesPoint').required('SalesPoint Required'),
            });
        },

        onSubmit: (values) => {
            SubmitForm(values);
        }
    }
    );

    useEffect(() => {
        if (formik.values.companyID !== 0) {
            GetSalesPointListForDropdown();
        }
    }, [formik.values.companyID]);

    useEffect(() => {
        if (userSalesPointID !== 0) {
            setValues({
                ...values,
                companyID: parseInt(userCompanyID),
                salesPointID: parseInt(userSalesPointID)
            })
        }
    }, [userSalesPointID]);

    async function SubmitForm(values) {
        if (isUpdate) {
            let model = {
                categoryName: values.categoryName,
                categoryCode: values.categoryCode,
                createdBy: userId == null ? 0 : parseInt(userId),
                itemCategoryID: parseInt(itemCategoryID),
                isActive: values.isActive
            }

            const result = await axios.post(API_URL + '/api/Item/ItemCategoryUpdate', model);
            if (result.data.statusCode === "Error") {
                toast.error(result.data.message);
                return;
            }
            else {
                toast.success(result.data.message, {
                    autoClose: 500,
                    onClose: () => navigate('/dashboard/category', { replace: true })
                });
            }
        } else {
            let model = {
                categoryName: values.categoryName,
                categoryCode: values.categoryCode,
                createdBy: userId == null ? 0 : parseInt(userId),
                salesPointID: parseInt(values.salesPointID)
            }
            const result = await axios.post(API_URL + '/api/Item/ItemCategorySave', model);
            if (result.data.statusCode === "Error") {
                toast.error(result.data.message);
                return;
            }
            else {
                toast.success(result.data.message, {
                    autoClose: 500,
                    onClose: () => navigate('/dashboard/category', { replace: true })
                });
            }
        }
    }

    const { setValues, handleSubmit, getFieldProps, values } = formik;

    async function GetItemCategoryDetailsByID(itemCategoryID) {
        const result = await axios.get(API_URL + '/api/Item/GetItemCategoryDetailsByID', { params: { itemCategoryID: parseInt(itemCategoryID) } });
        //const result = await axios.get('http://20.198.233.3:5080/api/Item/GetItemCategoryDetailsByID', { params: { itemCategoryID: parseInt(itemCategoryID) } });
        setValues({
            ...values,
            categoryCode: result.data.data.categoryCode,
            categoryName: result.data.data.categoryName,
            isActive: result.data.data.isActive

        })
    }

    async function GetComanyListForDropdown() {
        const result = await axios.get(API_URL + '/api/Company/GetCompaniesForDropDown');
        setComanyList(result.data.data)
    }

    async function GetSalesPointListForDropdown() {
        const result = await axios.get(API_URL + '/api/SalesPoint/GetSalesPointsForDropDown', { params: { companyID: parseInt(formik.values.companyID) } });
        setSalesPointList(result.data.data)
    }

    function generateDropDownMenuCompany(data) {
        let items = []
        if (data != null) {
            data.forEach(x => {
                items.push(x.isActive == true ? <MenuItem key={x.companyID} value={x.companyID}>{x.companyName}</MenuItem> : null)
            });
        }
        return items
    }

    function generateDropDownMenuSalesPoint(data) {
        let items = []
        if (data != null) {
            data.forEach(x => {
                items.push(x.isActive == true ? <MenuItem key={x.salesPointID} value={x.salesPointID}>{x.salesPointName}</MenuItem> : null)
            });
        }
        return items
    }

    function handleClick() {
        navigate('/dashboard/category');
    }

    return (
        <Box mt={0}>
            <Card>
                <Helmet>
                    <title>{isUpdate ? "Update Category | MIMS" : "Add Category | MIMS"}</title>
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
                                    {isUpdate ? "Update Category" : "Add Category"}
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
                                    label="Company *"
                                    value={formik.values.companyID}
                                    onChange={formik.handleChange}
                                    disabled={!admin}
                                    {...formik.getFieldProps('companyID')}
                                    error={Boolean(formik.touched.companyID && formik.errors.companyID)}
                                    helperText={formik.touched.companyID && formik.errors.companyID}
                                    sx={{ flex: 1 }}
                                >
                                    <MenuItem key={0} value={0}> Select Company</MenuItem>
                                    {generateDropDownMenuCompany(companyList)}
                                </TextField>
                                <TextField
                                    select
                                    fullWidth
                                    size="small"
                                    label="Sales Point *"
                                    value={formik.values.salesPointID}
                                    disabled={!admin}
                                    onChange={formik.handleChange}
                                    {...formik.getFieldProps('salesPointID')}
                                    error={Boolean(formik.touched.salesPointID && formik.errors.salesPointID)}
                                    helperText={formik.touched.salesPointID && formik.errors.salesPointID}
                                    sx={{ flex: 1 }}
                                >
                                    <MenuItem key={0} value={0}> Select Sales Point</MenuItem>
                                    {generateDropDownMenuSalesPoint(salesPointList)}
                                </TextField>
                            </Stack>
                            <Stack direction={{ xs: 'column', sm: 'row' }} style={{ marginTop: '25px' }} spacing={3}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Category Name *"
                                    value={formik.values.categoryName}
                                    onChange={formik.handleChange}
                                    {...formik.getFieldProps('categoryName')}
                                    error={Boolean(formik.touched.categoryName && formik.errors.categoryName)}
                                    helperText={formik.touched.categoryName && formik.errors.categoryName}
                                    sx={{ flex: 1 }}
                                />
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Category Code *"
                                    value={formik.values.categoryCode}
                                    disabled={isUpdate}
                                    onChange={formik.handleChange}
                                    {...formik.getFieldProps('categoryCode')}
                                    error={Boolean(formik.touched.categoryCode && formik.errors.categoryCode)}
                                    helperText={formik.touched.categoryCode && formik.errors.categoryCode}
                                    sx={{ flex: 1 }}
                                />
                                {isUpdate ?
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
                                    /> : null}
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
