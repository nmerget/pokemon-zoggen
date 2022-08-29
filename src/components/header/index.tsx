import React from 'react';
import { useSelector } from 'react-redux';
import { selectMenuOpen } from '../../features/local/localSlice';
import SideNav from './sidenav';
import ResponsiveAppBar from './app-bar';

function Header() {
  const menuOpen = useSelector(selectMenuOpen);

  return (
    <>
      <ResponsiveAppBar />
      {menuOpen && <SideNav />}
    </>
  );
}

export default Header;
