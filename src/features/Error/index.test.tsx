import { describe, test, expect, beforeEach } from 'vitest';
import { RenderResult } from '@testing-library/react';
import { ErrorEvent } from '.';
import { renderProviderWithRouter } from '../../utils/testUtils';
import { Route, Routes } from 'react-router-dom';

describe('<ErrorEvent />', () => {
  let wrapper: RenderResult<
    typeof import('@testing-library/dom/types/queries'),
    HTMLElement,
    HTMLElement
  > | null = null;

  beforeEach(() => {
    const authorRoute = (
      <Routes>
        <Route path="/error" element={<ErrorEvent />} />
      </Routes>
    );
    wrapper = renderProviderWithRouter('/error', authorRoute);
  });

  test('Error event component mounts properly', () => {
    expect(wrapper).toBeTruthy();
  });

  test('Error event text is showing up', () => {
    expect(wrapper?.getByText('Something Bad Happened.')).toBeInTheDocument();
  });
});
