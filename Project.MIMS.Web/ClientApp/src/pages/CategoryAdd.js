import { Helmet } from 'react-helmet-async';
import React, { useEffect, useState } from 'react';
// @mui
import { Stack, Typography, Card, TextField, Button } from '@mui/material';
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
import { useNavigate } from 'react-router-dom';
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
    const [userId, setUserId] = useState(null);
    const [donationTypeID, setDonationTypeID] = useState(0);
    const [tableData, setTableData] = useState([]);
    const [formData, setFormData] = useState({
        categoryCode: '',
        categoryName: ''

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

    const formik = useFormik({
        initialValues: {
            categoryName: formData.categoryName,
            categoryCode: formData.categoryCode
        },

        validationSchema: () => {
            return Yup.object().shape({
                categoryName: Yup.string().required("Please fill the category name"),
                categoryCode: Yup.string().required("Please fill the category code"),
            });
        },

        onSubmit: (values) => {
            SubmitForm(values);
        }
    }
    );

    async function SubmitForm(values) {
        let model = {
            categoryName: values.categoryName,
            categoryCode: values.categoryCode,
            createdBy: userId == null ? 0 : parseInt(userId)
        }
        const result = await axios.post('https://localhost:7211/api/Item/ItemCategorySave', model);
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

    const { errors, touched, handleSubmit, getFieldProps } = formik;

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

    return (
        <Box mt={0}>
            <Card>
                <Helmet>
                    <title> Category Add | MIMS </title>
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
                                    label="Category Name *"
                                    value={formik.values.categoryName}
                                    onChange={formik.handleChange}
                                    {...getFieldProps('categoryName')}
                                    error={Boolean(touched.categoryName && errors.categoryName)}
                                    helperText={touched.categoryName && errors.categoryName}
                                />
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Category Code *"
                                    value={formik.values.categoryCode}
                                    onChange={formik.handleChange}
                                    {...getFieldProps('categoryCode')}
                                    error={Boolean(touched.categoryCode && errors.categoryCode)}
                                    helperText={touched.categoryCode && errors.categoryCode}
                                />
                            </Stack>
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
