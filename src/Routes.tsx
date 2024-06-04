/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const LandingPage: React.FC = lazy(() =>
  import('./App').then((module) => ({ default: module.App }))
);

const NotFoundPage: React.FC = lazy(() =>
  import('./features/NotFound').then((module) => ({ default: module.NotFound }))
);

const ErrorPage: React.FC = lazy(() =>
  import('./features/Error').then((module) => ({ default: module.ErrorEvent }))
);


const routes: RouteObject[] = [
  {
    path: '/',
    errorElement: <ErrorPage />,
    element: <LandingPage />,
    children: [],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export { routes };
