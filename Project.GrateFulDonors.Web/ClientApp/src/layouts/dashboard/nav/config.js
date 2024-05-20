import { useRouteLoaderData } from 'react-router-dom';
import SvgColor from '../../../components/svg-color';
import { useState, useEffect } from 'react';
import axios from 'axios';

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

function DashboardNav() {
  const [userType, setUserType] = useState(0);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const userIdFromStorage = localStorage.getItem('userId');
    setUserId(userIdFromStorage);
  }, []);

  useEffect(() => {
    GetUserDetailsByUserID();
  }, [userId]);

  async function GetUserDetailsByUserID() {
    const result = await axios.get('https://localhost:7211/api/User/GetUserDetailsByUserID', {
      params: {
        userId: userId
      }
    });

    setUserType(result.data.data.userType);
  }

  const admin = [
    {
      title: 'dashboard',
      path: '/dashboard/app',
      icon: icon('ic_analytics'),
    },
    {
      title: 'users',
      path: '/dashboard/user',
      icon: icon('ic_user'),
    },
    {
      title: 'blog',
      path: '/dashboard/blog',
      icon: icon('ic_blog'),
    },
    {
      title: 'Profile',
      path: '/dashboard/profilePage',
      icon: icon('ic_usergroup'),
    },
    {
      title: 'Donation Request',
      path: '/dashboard/donationRequestAdd',
      icon: icon('ic_heart'),
    },
    {
      title: 'About',
      path: '/dashboard/about',
      icon: icon('ic_about'),
    },
  ];

  const donor = [
    {
      title: 'Dashboard',
      path: '/dashboard/app',
      icon: icon('ic_analytics'),
    },
    {
      title: 'Donate',
      path: '/dashboard/donate',
      icon: icon('ic_heart'),
    },
    {
      title: 'blog',
      path: '/dashboard/blog',
      icon: icon('ic_blog'),
    },
    {
      title: 'Profile',
      path: '/dashboard/profilePage',
      icon: icon('ic_usergroup'),
    },
    {
      title: 'About',
      path: '/dashboard/about',
      icon: icon('ic_about'),
    },
  ];

  const seeker = [
    {
      title: 'dashboard',
      path: '/dashboard/app',
      icon: icon('ic_analytics'),
    },
    {
      title: 'blog',
      path: '/dashboard/blog',
      icon: icon('ic_blog'),
    },
    {
      title: 'Profile',
      path: '/dashboard/profilePage',
      icon: icon('ic_usergroup'),
    },
    {
      title: 'Donation Request',
      path: '/dashboard/donationRequestAdd',
      icon: icon('ic_heart'),
    },
    {
      title: 'About',
      path: '/dashboard/about',
      icon: icon('ic_about'),
    },
  ];

  const exportIlement = userType === 1 ? admin : userType === 2 ? donor : seeker;

  return exportIlement;
}

export default DashboardNav;