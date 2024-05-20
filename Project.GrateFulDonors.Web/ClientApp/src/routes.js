import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DonatePage from './pages/DonatePage';
import DashboardAppPage from './pages/DashboardAppPage';
import Registration from './pages/Registration';
import ProfilePage from './pages/ProfilePage';
import DonationRequestAdd from './pages/DonationRequestAdd';
import Loader from './pages/Loader';
import AboutPage from './pages/AboutPage';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'donate', element: <DonatePage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'profilePage', element: <ProfilePage /> },
        { path: 'donationRequestAdd', element: <DonationRequestAdd /> },
        { path: 'about', element: <AboutPage /> }
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'registration',
      element: <Registration />,
    },
    {
      path: '/',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
    {
      path: 'loader',
      element: <Loader />,
    },

  ]);

  return routes;
}

