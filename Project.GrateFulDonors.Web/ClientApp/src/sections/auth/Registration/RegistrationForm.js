import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { useFormik, Form, FormikProvider } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from 'yup';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import MenuItem from '@material-ui/core/MenuItem';

// ----------------------------------------------------------------------

export default function RegistrationForm() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const today = new Date().toISOString().split('T')[0];
    const [registrationData, setloginData] = useState({
        nic: "",
        password: "",
        firstName: "",
        lastName: "",
        gender: 0,
        dob: today,
        address: ""
    });

    const RegistrationSchema = Yup.object().shape({
        username: Yup.string().required('User Name is required'),
        password: Yup.string().required('Password is required')
    });

    async function login(values) {
        const result = await axios.post('https://localhost:7211/api/User/Login', values);
        if (result.data.statusCode === "Error") {
            toast.error("Invalid User Name Or Password");
            setloginData({
                username: "",
                password: ""
            })
            return;
        }
        toast.success("Successfully Registered", {
            onClose: () => navigate('/dashboard/app', { replace: true })
        });
    }

    const formik = useFormik({
        initialValues: {
            nic: registrationData.nic,
            password: registrationData.password,
            firstName: registrationData.firstName,
            lastName: registrationData.lastName,
            dob: registrationData.dob,
            gender: registrationData.gender,
            address: registrationData.address,
            remember: true
        },
        validationSchema: RegistrationSchema,
        onSubmit: (values) => {
            login(values);
        }
    });
    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
    return (
        <>
            <FormikProvider value={formik}>
                <ToastContainer
                    position="bottom-right"
                    pauseOnHover
                />
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} style={{ marginTop: '25px' }} spacing={3}>
                        <TextField
                            fullWidth
                            size="small"
                            label="NIC *"
                            value={formik.values.nic}
                            onChange={formik.handleChange}
                            {...getFieldProps('nic')}
                            error={Boolean(touched.nic && errors.nic)}
                            helperText={touched.nic && errors.nic}
                        // disabled={factoryType == 1 || factoryType == 3}
                        />
                        <TextField select
                            fullWidth
                            size="small"
                            label="User Type *"
                            value={formik.values.userTypeID}
                            onChange={formik.handleChange}
                            {...getFieldProps('userTypeID')}
                            error={Boolean(touched.userTypeID && errors.userTypeID)}
                            helperText={touched.userTypeID && errors.userTypeID}
                        // disabled={formik.values.nic == '' || factoryType == 1 || factoryType == 3}
                        // InputProps={{
                        //     readOnly: pageProps.isEditType == 3
                        // }}
                        >
                            <MenuItem key={0} value={0}> Select User Type</MenuItem>
                            <MenuItem value={2}> Donor</MenuItem>
                            <MenuItem value={3}> Seeker</MenuItem>
                        </TextField>
                    </Stack>
                    <Stack direction={{ xs: 'column', sm: 'row' }} style={{ marginTop: '25px' }} spacing={3}>
                        <TextField
                            fullWidth
                            size="small"
                            label="First Name"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            {...getFieldProps('firstName')}
                            error={Boolean(touched.firstName && errors.firstName)}
                            helperText={touched.firstName && errors.firstName}
                        // disabled={formik.values.nic == '' || factoryType == 1 || factoryType == 3}
                        // InputProps={{
                        //     readOnly: pageProps.isEditType == 3
                        // }}
                        />
                        <TextField
                            fullWidth
                            size="small"
                            label="Last Name"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            {...getFieldProps('lastName')}
                            error={Boolean(touched.lastName && errors.lastName)}
                            helperText={touched.lastName && errors.lastName}
                        // disabled={factoryType == 1 || factoryType == 3}
                        />
                    </Stack>
                    <Stack direction={{ xs: 'column', sm: 'row' }} style={{ marginTop: '25px' }} spacing={3}>
                        <TextField
                            fullWidth
                            id="outlined-name"
                            size="small"
                            type="date"
                            label="DOB"
                            value={formik.values.dob}
                            onChange={formik.handleChange}
                            {...getFieldProps('dob')}
                            InputLabelProps={{ shrink: true }}
                            error={Boolean(touched.dob && errors.dob)}
                            helperText={touched.dob && errors.dob}
                        // disabled={formik.values.nic == '' || factoryType == 1 || factoryType == 3}
                        // InputProps={{
                        //     readOnly: pageProps.isEditType == 3
                        // }}
                        />
                    </Stack>
                    <Stack direction={{ xs: 'column', sm: 'row' }} style={{ marginTop: '25px' }} spacing={3}>
                        <TextField
                            select
                            fullWidth
                            size="small"
                            label="Gender"
                            value={formik.values.gender}
                            onChange={formik.handleChange}
                            {...getFieldProps('gender')}
                            error={Boolean(touched.gender && errors.gender)}
                            helperText={touched.gender && errors.gender}
                        // disabled={formik.values.nic == '' || factoryType == 1 || factoryType == 3}
                        // InputProps={{
                        //     readOnly: pageProps.isEditType == 3
                        // }}
                        >
                            <MenuItem key={0} value={0}> Select Gender</MenuItem>
                            <MenuItem value={1}> Male</MenuItem>
                            <MenuItem value={2}> Female</MenuItem>
                        </TextField>
                        <TextField
                            fullWidth
                            size="small"
                            label="Address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            {...getFieldProps('address')}
                            error={Boolean(touched.address && errors.address)}
                            helperText={touched.address && errors.address}
                        // disabled={formik.values.nic == '' || factoryType == 1 || factoryType == 3}
                        // InputProps={{
                        //   readOnly: pageProps.isEditType == 3
                        // }}
                        />
                    </Stack>
                    <LoadingButton fullWidth size="large" type="submit" variant="contained">
                        Register
                    </LoadingButton>
                </Form>
            </FormikProvider>
        </>
    );
}