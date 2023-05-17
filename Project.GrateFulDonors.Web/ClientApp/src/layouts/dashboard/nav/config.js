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

  const navConfig = [
    {
      title: 'dashboard',
      path: '/dashboard/app',
      icon: icon('ic_analytics'),
    },
    {
      title: 'user',
      path: '/dashboard/user',
      icon: icon('ic_user'),
    },
    {
      title: 'product',
      path: '/dashboard/products',
      icon: icon('ic_cart'),
    },
    {
      title: 'blog',
      path: '/dashboard/blog',
      icon: icon('ic_blog'),
    },
    {
      title: 'Profile',
      path: '/dashboard/profilePage',
      icon: icon('ic_user'),
    },
    {
      title: 'Not found',
      path: '/404',
      icon: icon('ic_disabled'),
    },
  ];

  const navConfig1 = [
    {
      title: 'dashboard',
      path: '/dashboard/app',
      icon: icon('ic_analytics'),
    },
    {
      title: 'product',
      path: '/dashboard/products',
      icon: icon('ic_cart'),
    },
    {
      title: 'blog',
      path: '/dashboard/blog',
      icon: icon('ic_blog'),
    },
    {
      title: 'Not found',
      path: '/404',
      icon: icon('ic_disabled'),
    },
    {
      title: 'Profile',
      path: '/dashboard/profilePage',
      icon: icon('ic_user'),
    },
  ];

  const navConfig2 = [
    {
      title: 'dashboard',
      path: '/dashboard/app',
      icon: icon('ic_analytics'),
    },
    {
      title: 'product',
      path: '/dashboard/products',
      icon: icon('ic_cart'),
    },
    {
      title: 'blog',
      path: '/dashboard/blog',
      icon: icon('ic_blog'),
    },
    {
      title: 'Not found',
      path: '/404',
      icon: icon('ic_disabled'),
    },
    {
      title: 'Profile',
      path: '/dashboard/profilePage',
      icon: icon('ic_user'),
    },
  ];

  const exportIlement = userType === 1 ? navConfig : userType === 2 ? navConfig1 : navConfig2;

  return exportIlement;
}

export default DashboardNav;