import { useRouteLoaderData } from 'react-router-dom';
import SvgColor from '../../../components/svg-color';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryIcon from '@mui/icons-material/Category';
import AbcIcon from '@mui/icons-material/Abc';
import BadgeIcon from '@mui/icons-material/Badge';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import { API_URL } from '../../../pages/configuration';


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
    const result = await axios.get(API_URL + '/api/User/GetUserDetailsByUserID', {
      params: {
        userId: userId
      }
    });

    setUserType(result.data.data.userType);
  }

  const admin = [
    {
      title: 'Dashboard',
      path: '/dashboard/app',
      icon: <GraphicEqIcon sx={{ color: 'mediumspringgreen' }} />,
    },
    {
      title: 'Category',
      path: '/dashboard/user',
      icon: icon('ic_user'),
    },
    {
      title: 'SubCategory',
      path: '/dashboard/blog',
      icon: icon('ic_blog'),
    },
    {
      title: 'Dealer',
      path: '/dashboard/profilePage',
      icon: icon('ic_usergroup'),
    },
    {
      title: 'Item',
      path: '/dashboard/donationRequestAdd',
      icon: icon('ic_heart'),
    }
  ];

  const donor = [
    {
      title: 'Dashboard',
      path: '/dashboard/app',
      icon: <GraphicEqIcon sx={{ color: 'mediumspringgreen' }} />,
    },
    {
      title: 'Category',
      path: '/dashboard/category',
      icon: <CategoryIcon sx={{ color: 'mediumspringgreen' }} />,
    },
    {
      title: 'Sub Category',
      path: '/dashboard/SubCategory',
      icon: <AbcIcon sx={{ color: 'mediumspringgreen' }} />,
    },
    {
      title: 'Dealer',
      path: '/dashboard/Dealer',
      icon: <BadgeIcon sx={{ color: 'mediumspringgreen' }} />,
    },
    {
      title: 'Item',
      path: '/dashboard/Item',
      icon: <AssessmentIcon sx={{ color: 'mediumspringgreen' }} />,
    },
    {
      title: 'Sale',
      path: '/dashboard/Sales',
      icon: <AttachMoneyIcon sx={{ color: 'mediumspringgreen' }} />,
    },
    {
      title: 'GRN',
      path: '/dashboard/GRNAdd',
      icon: <AttachMoneyIcon />,
    },
    {
      title: 'Report',
      //path: '/dashboard/Page404',
      icon: <AutoStoriesIcon />,
    },
    {
      title: 'Live Stock',
      path: '/dashboard/liveStock',
      icon: <AutoStoriesIcon />,
    },
    {
      title: 'Stock History',
      path: '/dashboard/Page404',
      icon: <AutoStoriesIcon />,
    },
    {
      title: 'Damage stock Report',
      path: '/dashboard/Page404',
      icon: <AutoStoriesIcon />,
    },
    {
      title: 'Sales Report',
      path: '/dashboard/Page404',
      icon: <AutoStoriesIcon sx={{ color: 'mediumspringgreen' }} />,
    },
    // {
    //   title: 'Category Add',
    //   path: '/dashboard/categoryAdd',
    //   icon: icon('ic_heart'),
    // }
  ];

  const seeker = [
    {
      title: 'Dashboard',
      path: '/dashboard/app',
      icon: <GraphicEqIcon sx={{ color: 'mediumspringgreen' }} />,
    },
    {
      title: 'Category',
      path: '/dashboard/blog',
      icon: icon('ic_blog'),
    },
    {
      title: 'Sub Category',
      path: '/dashboard/profilePage',
      icon: icon('ic_usergroup'),
    },
    {
      title: 'Item',
      path: '/dashboard/donationRequestAdd',
      icon: icon('ic_heart'),
    },
  ];

  const exportIlement = userType === 1 ? admin : userType === 2 ? donor : seeker;

  return exportIlement;
}

export default DashboardNav;