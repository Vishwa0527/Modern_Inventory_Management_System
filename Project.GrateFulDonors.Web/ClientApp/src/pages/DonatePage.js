import { Helmet } from 'react-helmet-async';
import React, { useEffect, useState } from 'react';
// @mui
import { Container, Stack, Typography, Card } from '@mui/material';
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

export default function DonatePage() {
  const [openFilter, setOpenFilter] = useState(false);
  const [userId, setUserId] = useState(null);
  const [donationTypeID, setDonationTypeID] = useState(0);
  const [tableData, setTableData] = useState([]);

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

  function handleClick(datas) {


  }
  return (
    <>
      <Helmet>
        <title> Donate | GrateFulDonors </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Donate
        </Typography>
        <br /><Divider variant="middle" /><br />
        {tableData.length == 0 ?
          <SearchNotFound searchQuery="Donation Requests" />
          :
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Card style={{ justifycontent: 'center', width: '85rem' }} >
              <TableContainer component={Paper} >
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Donation Type</TableCell>
                      <TableCell align="center">Requester Name</TableCell>
                      <TableCell align="center">Requester Mobile</TableCell>
                      {tableData.some((row) => row.bloodTypeName !== " ") && (
                        <TableCell align="center">Blood Type</TableCell>
                      )}
                      {tableData.some((row) => row.amount !== 0.00) && (
                        <TableCell align="center">Amount</TableCell>
                      )}
                      <TableCell align="center">Request Before</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : tableData
                    ).map((row) => {
                      const dateParts = row.requestBefore.split('T')[0];
                      const formattedDate = new Date(dateParts).toLocaleDateString();

                      return (
                        <TableRow key={row.donationRequestID}>
                          <TableCell align="center" component="th" scope="row">
                            {row.donationTypeName}
                          </TableCell>
                          <TableCell align="center">
                            {row.name}
                          </TableCell>
                          <TableCell align="center">
                            {row.contactNumber}
                          </TableCell>
                          {row.bloodTypeName !== "" && (
                            <TableCell align="center">
                              {row.bloodTypeName}
                            </TableCell>
                          )}
                          {row.amount !== 0.00 && (
                            <TableCell align="center">
                              {row.amount.toFixed(2)}
                            </TableCell>
                          )}
                          <TableCell align="center">
                            {formattedDate}
                          </TableCell>
                          <TableCell align="center">
                            <IconButton aria-label="delete" onClick={() => handleClick(row)}>
                              <VolunteerActivismIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                        colSpan={6}
                        count={tableData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                          inputProps: {
                            'aria-label': 'rows per page',
                          },
                          native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </Card>
          </Stack>
        }
      </Container >
    </>
  );
}
