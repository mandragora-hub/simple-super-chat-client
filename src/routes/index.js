import React from 'react';
import { Navigate } from 'react-router-dom';
import HomeLayout from 'src/layouts/HomeLayout';
import HomeView from 'src/views/home';
import JoinView from 'src/views/join';
import RoomView from 'src/views/room';
import NotFoundView from 'src/views/errors/NotFoundView';

const Routes = [
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      { path: '/', element: <HomeView /> },
      { path: '/room/:uuid', element: <RoomView /> },
      { path: '/join', element: <JoinView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <HomeLayout />,
    children: [{ path: '404', element: <NotFoundView /> }]
  }
];

export default Routes;
