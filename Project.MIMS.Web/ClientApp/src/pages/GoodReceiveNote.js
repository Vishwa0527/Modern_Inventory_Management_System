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
import { CSVLink } from 'react-csv';
import CSVReader from 'react-csv-reader';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';

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

export default function GRNAddPage() {
    const navigate = useNavigate();
    const { itemCategoryID } = useParams();
    const [userId, setUserId] = useState(null);
    const [isUpdate, setIsUpdate] = useState(false);
    const [admin, setIsAdmin] = useState(false);
    const [companyList, setComanyList] = useState([]);
    const [salesPointList, setSalesPointList] = useState([]);
    const [userCompanyID, setUserCompanyID] = useState(0);
    const [userSalesPointID, setUserSalesPointID] = useState(0);
    const [isFileChosen, setIsFileChosen] = useState(false);
    const [fileInfo, setFileInfo] = useState(null);
    const [hartiBulkUpload, setHartiBulkUpload] = useState([]);
    const [Datevalue, setDateValue] = React.useState(new Date().setDate(new Date().getDate()));
    const [isTableEnable, setIsTableEnable] = useState(true);
    const [farmersCSVData, setFarmersCSVData] = useState([]);
    const [toDate, setToDate] = useState(new Date());
    const [dealerList, setDealerList] = useState([]);

    const [formData, setFormData] = useState({
        grnNumber: '',
        isActive: false,
        companyID: 0,
        salesPointID: 0,
        dealerID: 0

    });

    const papaparseOptions = {
        header: true,
        dynamicTyping: false,
        quoteChar: '"',
        skipEmptyLines: true,
        parseNumbers: true,
        transformHeader: header => header.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '')
    };

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
        GetDealerListForDropdown();
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
            grnNumber: formData.grnNumber,
            isActive: formData.isActive,
            companyID: formData.companyID,
            salesPointID: formData.salesPointID,
            dealerID: formData.dealerID
        },

        validationSchema: () => {
            return Yup.object().shape({
                grnNumber: Yup.string().required("Please fill the GRN Number"),
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
        if (hartiBulkUpload.length == 0) {
            toast.error("Please upload atleast one GRN");
        } else {
            let model = {
                companyID: parseInt(values.companyID),
                salesPointID: parseInt(values.salesPointID),
                dealerID: parseInt(values.dealerID),
                grnNumber: values.grnNumber,
                ArrayList: hartiBulkUpload
            }
            const result = await axios.post(API_URL + '/api/Item/ItemCategorySave', model);
            if (result.data.statusCode === "Error") {
                toast.error(result.data.message);
                return;
            }
            else {
                toast.success(result.data.message, {
                    autoClose: 500
                });
                clearAll()
            }
        }
    }

    const { setValues, handleSubmit, getFieldProps, values, errors, touched } = formik;

    async function GetItemCategoryDetailsByID(itemCategoryID) {
        const result = await axios.get(API_URL + '/api/Item/GetItemCategoryDetailsByID', { params: { itemCategoryID: parseInt(itemCategoryID) } });
        //const result = await axios.get('http://20.198.233.3:5080/api/Item/GetItemCategoryDetailsByID', { params: { itemCategoryID: parseInt(itemCategoryID) } });
        setValues({
            ...values,
            categoryCode: result.data.data.categoryCode,
            grnNumber: result.data.data.grnNumber,
            isActive: result.data.data.isActive

        })
    }

    async function GetDealerListForDropdown() {
        const result = await axios.get(API_URL + '/api/Dealer/GetAllDealersForDropdown');
        setDealerList(result.data.data)
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

    const handleForce = (data, fileInfo) => {
        setIsFileChosen(true);
        setFileInfo(fileInfo);
        assginMarket(data, fileInfo);
        confirmUpload(data, fileInfo);

    }

    async function assginMarket(data, type) {
        if (type.type === "text/csv") {
            setHartiBulkUpload([])
            let datarest = await Promise.all(data.map(async data => {

                var hartiDetails = {
                    itemCode: data.itemCode,
                    serialNumber: data.serialNumber,
                    sellingPrice: data.sellingPrice,
                    retailPrice: data.retailPrice,
                    quantity: data.quantity
                }
                setHartiBulkUpload(hartiBulkUpload => [...hartiBulkUpload, hartiDetails]);
                setIsTableEnable(false)
            }))

            var errorList = [];
            datarest.map((itemx) => {
                if (itemx != undefined) {
                    errorList.push(itemx);
                }
            })
            setFarmersCSVData(errorList);
        }

        else {
            toast.error(type.name + " is not valid . please select a CSV file.");
            setTimeout(() => {
            }, 3000);
        }
    }

    function confirmUpload(data, fileInfo) {
        setFarmersCSVData(data);
    }

    const csvHeaders = [
        { label: "itemCode", key: "itemCode" },
        { label: "serialNumber", key: "serialNumber" },
        { label: "sellingPrice", key: "sellingPrice" },
        { label: "retailPrice", key: "retailPrice" },
        { label: "quantity", key: "quantity" }
    ];

    const csvData = [
        {
            itemCode: "", serialNumber: "", quantity: "", sellingPrice: "", retailPrice: "",
        },
    ];

    const csvData2 = [
        {
            itemCode: "S001", serialNumber: "X001", quantity: "100", sellingPrice: "1000", retailPrice: "1000",
        },
    ];

    function generateDropDownMenuDealer(data) {
        let items = []
        if (data != null) {
            data.forEach(x => {
                items.push(<MenuItem key={x.dealerID} value={x.dealerID}>{x.dealerName}</MenuItem>)
            });
        }
        return items
    }

    function clearAll() {
        setHartiBulkUpload([])
        setValues({
            ...values,
            dealerID: 0,
            grnNumber: ''
        })
    }

    return (
        <Box mt={0}>
            <Card>
                <Helmet>
                    <title>{"GRN | MIMS"}</title>
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
                                    {"GRN"}
                                </Typography>
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
                                    label="GRN Number *"
                                    value={formik.values.grnNumber}
                                    onChange={formik.handleChange}
                                    {...formik.getFieldProps('grnNumber')}
                                    error={Boolean(formik.touched.grnNumber && formik.errors.grnNumber)}
                                    helperText={formik.touched.grnNumber && formik.errors.grnNumber}
                                    sx={{ flex: 1 }}
                                />
                            </Stack>
                            <br />
                            <br />
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <Button variant="contained" color='secondary' component="span">
                                    <CSVReader
                                        label={isFileChosen ? 'File Chosen' : 'Choose File'}
                                        inputStyle={{ display: 'none' }}
                                        onFileLoaded={handleForce}
                                        parserOptions={papaparseOptions}
                                        inputId="react-csv-reader-input"
                                        cssClass="csv-reader-input"
                                    />
                                </Button>
                                {isFileChosen ? <span>{fileInfo.name}</span> : null}
                                <Button variant="contained" color='primary' component="span">
                                    <CSVLink
                                        data={csvData}
                                        headers={csvHeaders}
                                        style={{ color: 'white' }}
                                        filename={"GRN Template.csv"}
                                    >
                                        Template
                                    </CSVLink>
                                </Button>
                                <Button variant="contained" color='primary' component="span">
                                    <CSVLink
                                        data={csvData2}
                                        headers={csvHeaders}
                                        style={{ color: 'white' }}
                                        filename={"GRN Sample Template.csv"}
                                    >
                                        Sample Data
                                    </CSVLink>
                                </Button>
                            </Stack>
                            {isTableEnable == false ?
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                    <Card style={{ justifycontent: 'center', width: '85rem' }} >
                                        <TableContainer component={Paper} >
                                            <Table aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align="center">Item Code</TableCell>
                                                        <TableCell align="center">Serial Number</TableCell>
                                                        <TableCell align="center">Selling Price</TableCell>
                                                        <TableCell align="center">Retail Price</TableCell>
                                                        <TableCell align="center">Qty</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {(hartiBulkUpload).map((row, index, array) => {
                                                        const isDuplicate = array.findIndex((item) => item.itemCode === row.itemCode) !== index;
                                                        return (
                                                            <TableRow
                                                                key={row.itemCode}
                                                                style={{
                                                                    backgroundColor: isDuplicate ? '#FFEBEE' : 'inherit'
                                                                }}
                                                            >
                                                                <TableCell align="center">
                                                                    {row.itemCode}
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    {row.serialNumber}
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    {row.sellingPrice}
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    {row.retailPrice}
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    {row.quantity}
                                                                </TableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Card>
                                </Stack> : null}
                            <Box display="flex" justifyContent="flex-end" p={2}>
                                <Button
                                    color="primary"
                                    type="submit"
                                    size='small'
                                    variant="contained"
                                >
                                    {"Upload"}
                                </Button>
                            </Box>
                        </Form>
                    </FormikProvider>
                </CardContent>
            </Card>
        </Box>
    );
}
