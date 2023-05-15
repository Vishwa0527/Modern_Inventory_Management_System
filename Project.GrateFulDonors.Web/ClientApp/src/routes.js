import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import Registration from './pages/Registration';
import ProfilePage from './pages/ProfilePage';

// ----------------------------------------------------------------------

export default function Router({ role }) {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: role === 'admin' ? <UserPage /> : null },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
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
      path: '/profilePage',
      element: <ProfilePage />,
    },
  ]);

  return routes;
}

