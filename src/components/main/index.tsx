import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';
import { RootState } from '../../app/store';
import { DefaultMenuItems } from '../../app/constants';

function Main() {
  const navigate = useNavigate();
  const location = useLocation();
  const firebaseSelector = useSelector(
    (state: RootState) => state.firebase,
  ) as any;

  useEffect(() => {
    if (isLoaded(firebaseSelector.auth)) {
      if (firebaseSelector?.auth?.isEmpty) {
        navigate('/login');
      } else if (location.pathname === '/') {
        navigate(DefaultMenuItems[0].link);
      }
    }
  }, [navigate, firebaseSelector, DefaultMenuItems]);

  return (
    <main className="flex-auto overflow-auto h-full flex flex-col bg-gray-100 p-2 md:p-4 xl:p-16 lg:p-8">
      <Outlet />
    </main>
  );
}

export default Main;
