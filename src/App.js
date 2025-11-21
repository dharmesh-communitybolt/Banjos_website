import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { CSpinner } from '@coreui/react-pro';
import './scss/style.scss';
import './scss/examples.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

// Layouts
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));

// Public Pages
const WebIndex = React.lazy(() => import('./website/WebIndex'));
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

// Admin Pages
const MenuManagement = React.lazy(() => import('./views/Admin/MenuManagement'));
const VisitorTestimonialsPage = React.lazy(() => import('./views/Admin/VisitorTestimonialsPage'));
const FranchiseRequests = React.lazy(() => import('./views/Admin/FranchiseRequests'));
const JobPositions = React.lazy(() => import('./views/Admin/JobPositions'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const JobApplicationFollowUp = React.lazy(() => import('./views/Admin/JobApplicationFollowUp'));
const Branches = React.lazy(() => import('./views/Admin/Branches'));
const GalleryCategoriesPage = React.lazy(() => import('./views/Admin/GalleryCategoriesPage'));
const OnlineOrderLinks = React.lazy(() => import('./views/Admin/OnlineOrderLinks'));
const ImagesPage = React.lazy(() => import('./views/Admin/ImagesPage'));
const TestimonialsPage = React.lazy(() => import('./views/Admin/TestimonialsPage'));
const AdminDashboard = React.lazy(() => import('./views/Admin/AdminDashboard'));
const CategoriesManagement = React.lazy(() => import('./views/Admin/CategoriesManagement'));
const UserRegistaration = React.lazy(() => import('./views/Admin/UserRegistaration'));

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('access_token');
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

// Admin Layout Wrapper
const AdminLayoutWrapper = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <Outlet />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div className="pt-3 text-center"><CSpinner color="primary" variant="grow" /></div>}>
        <Routes>
          {/* Public Routes */}
          <Route path="/WebIndex/*" element={<WebIndex />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/404" element={<Page404 />} />
          <Route path="/500" element={<Page500 />} />
          <Route path="/" element={<Navigate to="/WebIndex" />} />

          {/* Protected Admin Routes */}
          <Route element={<AdminLayoutWrapper />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/AdminDashboard" element={<AdminDashboard />} />
            <Route path="/admin/MenuManagement" element={<MenuManagement />} />
            <Route path="/admin/VisitorTestimonialsPage" element={<VisitorTestimonialsPage />} />
            <Route path="/admin/FranchiseRequests" element={<FranchiseRequests />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/JobPositions" element={<JobPositions />} />
            <Route path="/admin/Branches" element={<Branches />} />
            <Route path="/admin/JobApplicationFollowUp" element={<JobApplicationFollowUp />} />
            <Route path="/admin/GalleryCategoriesPage" element={<GalleryCategoriesPage />} />
            <Route path="/admin/OnlineOrderLinks" element={<OnlineOrderLinks />} />
            <Route path="/admin/ImagesPage" element={<ImagesPage />} />
            <Route path="/admin/CategoriesManagement" element={<CategoriesManagement />} />
            <Route path="/admin/TestimonialsPage" element={<TestimonialsPage />} />
            <Route path="/admin/UserRegistaration" element={<UserRegistaration />} />
          </Route>

          {/* Catch-All Route for 404 */}
          <Route path="*" element={<Navigate to="/WebIndex" />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;