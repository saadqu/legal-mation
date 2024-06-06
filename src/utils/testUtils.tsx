import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { App } from '../App';
import { ReactElement } from 'react';

export const renderWithProviders = (ui: JSX.Element) => {
  const queryClient = new QueryClient();
  return render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{ui}</BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
};

export const renderProviderWithRouter = (initialRoute: string, Routes: ReactElement) => {
  const queryClient = new QueryClient();
  return render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[initialRoute]}>
          {Routes}
          <App />
        </MemoryRouter>
      </QueryClientProvider>
    </Provider>
  );
};
