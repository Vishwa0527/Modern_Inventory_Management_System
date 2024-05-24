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
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import PerfectScrollbar from 'perfect-scrollbar';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link as RouterLink, useNavigate, useHref } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

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
    const [openFilter, setOpenFilter] = useState(false);
    const [userId, setUserId] = useState(null);
    const [donationTypeID, setDonationTypeID] = useState(0);
    const [dealers, setDealers] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [formData, setFormData] = useState({
        categoryCode: '',
        dealerID: 0,
        farmerID: 0,

    });

    useEffect(() => {
        const userIdFromStorage = localStorage.getItem('userId');
        setUserId(userIdFromStorage);
    }, []);

    useEffect(() => {
        if (userId != null) {
            GetDonationTypeID();
        }
    }, [userId]);

    useEffect(() => {
        if (donationTypeID != 0) {
            DonationRequestDetailsGet();
        }
    }, [donationTypeID]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const formik = useFormik({
        initialValues: {
            dealerID: formData.dealerID,
            categoryCode: formData.categoryCode
            // operationEntityID: selectedOptionsFCC,
            // farmerID: selectedOptionsFarmer,
            // fromDate: date1.toISOString().split('T')[0],
            // toDate: date2.toISOString().split('T')[0]
        },

        validationSchema: () => {
            return Yup.object().shape({
                // groupID: Yup.number().min(1, 'Please Select Group').required('Group required'),
                // operationEntityID: Yup.array()
                //     .min(1, 'Please select at least one Fresh collection center')
                //     .required('Please select at least one Fresh collection center'),
                // farmerID: Yup.array()
                //     .min(1, 'Please select at least one Farmer')
                //     .required('Please select at least one Farmer'),
                // toDate: Yup.date().min(1).min(1, 'Please Select End date').required('End date required'),
                // fromDate: Yup.date().min(1).min(1, 'Please Select Start Date').required('Start Date required')
            });
        },

        onSubmit: (values) => {
            SubmitForm();
        }
    }
    );

    async function SubmitForm() {
        let model = {

        }
        const result = await axios.post('https://localhost:7211/api/User/Registration', model);
        if (result.data.statusCode === "Error") {
            toast.error("Error Occured in Category Save");
            return;
        }
        else {
            toast.success("Category Successfully Saved", {
                onClose: () => navigate('/login', { replace: true })
            });
        }
    }

    const { errors, touched, setValues, handleSubmit, isSubmitting, getFieldProps, values } = formik;

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    async function GetDonationTypeID() {
        const result = await axios.get('https://localhost:7211/api/DonationType/GetDonationTypeID', { params: { userID: parseInt(userId) } });
        setDonationTypeID(result.data.data.donationTypeID);
        return;
    }

    async function DonationRequestDetailsGet() {
        const result = await axios.get('https://localhost:7211/api/DonationRequest/DonationRequestDetailsGet', { params: { DonationTypeID: parseInt(donationTypeID) } });
        setTableData(result.data.data);
        return;
    }

    function handleClick() {
        navigate('/dashboard/category');
    }

    function generateDealerDropDownMenu(data) {
        let items = []
        if (data != null) {
            data.forEach(x => {
                items.push(x.isActive == true ? <MenuItem key={x.dealerID} value={x.dealerID}>{x.dealerName}</MenuItem> : null)
            });
        }
        return items
    }

    return (
        <Box mt={0}>
            <Card>
                <Helmet>
                    <title> Category Add | MIMS </title>
                </Helmet>
                <Divider />
                <CardContent>
                    <FormikProvider value={formik}>
                        <Form
                            autoComplete="off"
                            disabled={!(formik.isValid && formik.dirty)}
                            noValidate
                            onSubmit={handleSubmit}
                        >
                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                <Typography variant="h6">
                                    Add Category
                                </Typography>
                                <Button variant="contained"
                                    onClick={handleClick}><ArrowBackIcon /></Button>
                            </Stack>
                            <br />
                            <Stack direction={{ xs: 'column', sm: 'row' }} style={{ marginTop: '25px' }} spacing={3}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Category Name"
                                    value={formik.values.categoryName}
                                    onChange={formik.handleChange}
                                    {...getFieldProps('categoryName')}
                                    error={Boolean(touched.categoryName && errors.categoryName)}
                                    helperText={touched.categoryName && errors.categoryName}
                                />
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Category Code"
                                    value={formik.values.categoryCode}
                                    onChange={formik.handleChange}
                                    {...getFieldProps('categoryCode')}
                                    error={Boolean(touched.categoryCode && errors.categoryCode)}
                                    helperText={touched.categoryCode && errors.categoryCode}
                                />
                                <TextField
                                    select
                                    fullWidth
                                    size="small"
                                    label="Dealer "
                                    value={formik.values.dealerID}
                                    onChange={formik.handleChange}
                                    {...getFieldProps('dealerID')}
                                    error={Boolean(touched.dealerID && errors.dealerID)}
                                    helperText={touched.dealerID && errors.dealerID}
                                >
                                    <MenuItem key={0} value={0}> Select Dealer</MenuItem>
                                    {generateDealerDropDownMenu(dealers)}
                                </TextField>
                            </Stack>
                            {/* <Grid container spacing={3}>
                                <Grid item md={4} xs={12}>
                                    <InputLabel shrink id="jobCategoryCode">
                                        Category Code *
                                    </InputLabel>
                                    <TextField
                                        fullWidth
                                        name="jobCategoryCode"
                                        size='small'
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <InputLabel shrink id="jobCategoryName">
                                        Dealer Name
                                    </InputLabel>
                                    <TextField
                                        fullWidth
                                        name="jobCategoryName"
                                        size='small'
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <InputLabel shrink id="description">
                                        Description
                                    </InputLabel>
                                    <TextField
                                        fullWidth
                                        name="description"
                                        size='small'
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid> */}
                            <Box display="flex" justifyContent="flex-end" p={2}>
                                <Button
                                    color="primary"
                                    type="submit"
                                    size='small'
                                    variant="contained"
                                >
                                    {"Save"}
                                </Button>
                            </Box>
                        </Form>
                    </FormikProvider>
                </CardContent>
            </Card>
        </Box>
    );
}
