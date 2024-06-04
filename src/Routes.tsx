/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { AddBook } from './features/Books/add';
import { EditBook } from './features/Books/edit';
import { AddAuthor } from './features/Authors/add';
import { EditAuthor } from './features/Authors/edit';

const LandingPage: React.FC = lazy(() =>
  import('./App').then((module) => ({ default: module.App }))
);

const AuthorPage: React.FC = lazy(() =>
  import('./features/Authors').then((module) => ({ default: module.Authors }))
);

const BooksPage: React.FC = lazy(() =>
  import('./features/Books').then((module) => ({ default: module.BooksComponent }))
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
    children: [
      {
        index: true,
        path: '/',
        element: <AuthorPage />
      },
      {
        path: '/authors',
        element: <AuthorPage />
      },
      {
        path: '/add-author',
        element: <AddAuthor />
      },
      {
        path: '/edit-author/:id',
        element: <EditAuthor />
      },
      {
        path: '/books',
        element: <BooksPage />
      },
      {
        path: '/add-book',
        element: <AddBook />
      },
      {
        path: '/edit-book/:id',
        element: <EditBook />
      }
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export { routes };
