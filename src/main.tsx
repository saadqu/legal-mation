import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { routes } from './Routes';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ErrorEvent } from './features/Error';
import makeServer from './mirage/server';

if (process.env.NODE_ENV === 'development') {
  makeServer({ environment: 'development' });
}

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
      <React.StrictMode>
        <ErrorBoundary fallback={<ErrorEvent />}>
          <Suspense fallback={<div>Loading....</div>}>
            <RouterProvider router={router} />
          </Suspense>
        </ErrorBoundary>
      </React.StrictMode>
  </Provider>
);
