// component
import { useRouteLoaderData } from 'react-router-dom';
import SvgColor from '../../../components/svg-color';
import { useState, useEffect } from 'react';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

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
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;

// import { useRouteLoaderData } from 'react-router-dom';
// import SvgColor from '../../../components/svg-color';
// import { useState, useEffect } from 'react';

// const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

// function DashboardNav() {
//   const [userType, setUserType] = useState(0);
//   const navConfig = [
//     {
//       title: 'dashboard',
//       path: '/dashboard/app',
//       icon: icon('ic_analytics'),
//     },
//     {
//       title: 'user',
//       path: '/dashboard/user',
//       icon: icon('ic_user'),
//     },
//     {
//       title: 'product',
//       path: '/dashboard/products',
//       icon: icon('ic_cart'),
//     },
//     {
//       title: 'blog',
//       path: '/dashboard/blog',
//       icon: icon('ic_blog'),
//     },
//     // {
//     //   title: 'login',
//     //   path: '/login',
//     //   icon: icon('ic_lock'),
//     // },
//     {
//       title: 'Not found',
//       path: '/404',
//       icon: icon('ic_disabled'),
//     },
//   ];

//   const navConfig1 = [
//     {
//       title: 'dashboard',
//       path: '/dashboard/app',
//       icon: icon('ic_analytics'),
//     },
//     // {
//     //   title: 'user',
//     //   path: '/dashboard/user',
//     //   icon: icon('ic_user'),
//     // },
//     {
//       title: 'product',
//       path: '/dashboard/products',
//       icon: icon('ic_cart'),
//     },
//     {
//       title: 'blog',
//       path: '/dashboard/blog',
//       icon: icon('ic_blog'),
//     },
//     {
//       title: 'Not found',
//       path: '/404',
//       icon: icon('ic_disabled'),
//     },
//   ];

//   useEffect(() => {
//     setUserType(2);
//   }, []);

//   const exportIlement = userType === 1 ? navConfig : navConfig1;

//   return exportIlement;
// }

// export default DashboardNav;