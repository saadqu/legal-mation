import { describe, test, expect, beforeEach } from 'vitest';
import { RenderResult } from '@testing-library/react';
import { Authors } from '.';
import { renderProviderWithRouter } from '../../utils/testUtils';
import { Route, Routes } from 'react-router-dom';

describe('<Authors />', () => {
  let wrapper: RenderResult<
    typeof import('@testing-library/dom/types/queries'),
    HTMLElement,
    HTMLElement
  > | null = null;

  beforeEach(() => {
    const authorRoute = (
      <Routes>
        <Route path="/authors" element={<Authors />} />
      </Routes>
    );
    wrapper = renderProviderWithRouter('/authors', authorRoute);
  });

  test('Authors mounts properly', () => {
    expect(wrapper).toBeTruthy();
  });
});
