import { describe, test, expect, beforeEach } from 'vitest';
import { RenderResult } from '@testing-library/react';
import { NotFound } from '.';
import { renderProviderWithRouter } from '../../utils/testUtils';
import { Route, Routes } from 'react-router-dom';

describe('<NotFound />', () => {
  let wrapper: RenderResult<
    typeof import('@testing-library/dom/types/queries'),
    HTMLElement,
    HTMLElement
  > | null = null;

  beforeEach(() => {
    const authorRoute = (
      <Routes>
        <Route path="/not-found" element={<NotFound />} />
      </Routes>
    );
    wrapper = renderProviderWithRouter('/not-found', authorRoute);
  });

  test('Not found mounts properly', () => {
    expect(wrapper).toBeTruthy();
  });

  test('Not found text is showing up', () => {
    expect(wrapper?.getByText('Page you are looking for not found.')).toBeInTheDocument();
  });
});
