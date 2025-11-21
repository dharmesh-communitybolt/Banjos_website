import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react-pro';
import { AppSidebarNav } from './AppSidebarNav';
import navigation from '../_nav';

// Import your logo image
import logo from '../assets/images/banjos.png'; // Update path if different

const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebarShow);

  return (
    <CSidebar
      colorScheme="light"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible });
      }}
    >
      {/* Sidebar Header */}
      <CSidebarHeader className="bg-black border-bottom d-flex align-items-center justify-content-between">
        {/* Sidebar Brand with Logo */}
        <CSidebarBrand as={NavLink} to="/" className="d-flex align-items-center">
          <img
            src={logo}
            alt="Banjos Logo"
            style={{ height: '47px', width: '140px' }} // Adjust size as needed
          />
        </CSidebarBrand>

        {/* Close Button */}
        <CCloseButton
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
          style={{
            position: 'absolute',
            right: '15px',
            top: '15px',
            zIndex: 1000,
            display: sidebarShow ? 'block' : 'none',
          }}
        />
      </CSidebarHeader>

      {/* Sidebar Navigation */}
      <AppSidebarNav items={navigation} />

      {/* Sidebar Toggler */}
      <CSidebarToggler
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
