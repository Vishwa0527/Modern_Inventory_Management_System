import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from './configuration';



// ----------------------------------------------------------------------

export default function DashboardAppPage() {

  const theme = useTheme();

  const [userId, setUserId] = useState(null);
  const [donationTypeLegnth, setDonationTypeLegnth] = useState(0);
  const [donorLegnth, setDonorLegnth] = useState(0);
  const [seekerLegnth, setSeekerLegnth] = useState(0);

  const newsUpdates = [
    {
      id: '1',
      title: 'Smart Phones',
      description: 'Samsung Company Introduced the new S24 Ultra',
      image: '/assets/images/covers/cover_1.jpg',
      postedAt: new Date('2024-07-01'),
    },
    {
      id: '2',
      title: 'Sony TV',
      description: 'Sony Bravia has new smart TV series.',
      image: '/assets/images/covers/cover_2.jpg',
      postedAt: new Date('2024-07-02'),
    },
    {
      id: '3',
      title: 'Best Branch',
      description: 'Boralla Branch is the most sale branch in this month',
      image: '/assets/images/covers/cover_3.jpg',
      postedAt: new Date('2024-07-03'),
    },
    {
      id: '4',
      title: 'Fridge',
      description: 'New Samsung Fridge series has R600a gas.',
      image: '/assets/images/covers/cover_4.jpg',
      postedAt: new Date('2024-07-04'),
    },
    {
      id: '5',
      title: 'JBL Sound Systems',
      description: 'JBL Party box new stock coming soon.',
      image: '/assets/images/covers/cover_5.jpg',
      postedAt: new Date('2024-07-05'),
    },
  ];

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem('userId');
    setUserId(userIdFromStorage);
  }, []);

  useEffect(() => {
    GetAllDonationTypeLength();
    GetAllDonorLength();
    GetAllSeekerLength();
  }, []);

  async function GetAllDonationTypeLength() {
    const result = await axios.get(API_URL + '/api/DonationType/GetAllDonationTypeLength');
    setDonationTypeLegnth(result.data.data.length)
    return;
  }

  async function GetAllDonorLength() {
    const result = await axios.get(API_URL + '/api/Donor/GetAllDonorLength');
    setDonorLegnth(result.data.data.length)
    return;
  }

  async function GetAllSeekerLength() {
    const result = await axios.get(API_URL + '/api/Seeker/GetAllSeekerLength');
    setSeekerLegnth(result.data.data.length)
    return;
  }
  return (
    <>
      <Helmet>
        <title> Dashboard | MIMS </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          {/* <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Donors" total={donorLegnth} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Seekers" total={seekerLegnth} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Donations" total={1} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Donation Types" total={donationTypeLegnth} color="error" icon={'ant-design:bug-filled'} />
          </Grid> */}

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Sales Chart"
              subheader="Best Sales in June"
              chartLabels={[
                '10/01/2023',
                '11/01/2023',
                '12/01/2023',
                '01/01/2024',
                '02/01/2024',
                '03/01/2024',
                '04/01/2024',
                '05/01/2024',
                '06/01/2024',
                '07/01/2024',
                '08/01/2024',
              ]}
              chartData={[
                // {
                //   name: 'Sales',
                //   type: 'column',
                //   fill: 'solid',
                //   data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                // },
                {
                  name: 'sales',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 57, 22, 43, 21, 41, 76, 27, 43],
                }
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Now in Stock"
              chartData={[
                { label: 'Fridge', value: 10 },
                { label: 'TV', value: 20 },
                { label: 'Sound Systems', value: 25 },
                { label: 'Iorn', value: 15 },
                { label: 'Rice Cooker', value: 10 },
                { label: 'Laptop', value: 18 },
                { label: 'Smart Phones', value: 38 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Fast Moving Items (Overview)"
              subheader="(+30%) than last year"
              chartData={[
                { label: 'Fridge', value: 400 },
                { label: 'TV', value: 430 },
                { label: 'Rice Cooker', value: 448 },
                { label: 'Iron', value: 470 },
                { label: 'Laptop', value: 640 },
                { label: 'Sound Systems', value: 780 },
                { label: 'Smart Phones', value: 900 },

              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Best Branchers"
              chartLabels={['Homagama', 'Boralla', 'Kottawa', 'Maradana', 'Colombo Fort',]}
              chartData={[
                { name: 'March', data: [80, 50, 30, 40] },
                { name: 'April', data: [20, 30, 40, 80] },
                { name: 'May', data: [44, 76, 78, 13] },
                { name: 'June', data: [70, 60, 75, 23] },
                { name: 'July', data: [55, 86, 78, 18] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={newsUpdates.map((x, index) => ({
                id: x.id,
                title: x.name,
                description: x.description,
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: x.postedAt,
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Stock Received"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  'Sony 32inch LED TV',
                  'Samsung A05,A06,A07 Smart phones',
                  'LG HIFI System 3',
                  'Samsung R600a Fridge',
                  'Haire Air conditioner'
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Donate 100 Kidneys to patients' },
                { id: '2', label: 'Gather the best community in the donation area' },
                { id: '3', label: 'Help needy patients to recover from their illnesses' },
                { id: '4', label: 'Donate 100,000 Money ' },
                { id: '5', label: 'Spread the system around the country' },
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
