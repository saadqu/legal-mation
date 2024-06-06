import { describe, test, expect, beforeEach, afterAll } from 'vitest';
import { RenderResult, act, fireEvent } from '@testing-library/react';
import { AddAuthor } from './add';
import { fetchAuthors } from '../../services/authors';
import makeServer from '../../mirage/server';
import {
  renderProviderWithRouter,
} from '../../utils/testUtils';
import { Route, Routes } from 'react-router-dom';

describe('<AddAuthor />', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let server: any = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let wrapper: RenderResult<
    typeof import('@testing-library/dom/types/queries'),
    HTMLElement,
    HTMLElement
  > | null = null;

  beforeEach(() => {
    if (process.env.NODE_ENV === 'test' && !server) {
      server = makeServer({ environment: 'test' });
    }

    const authorRoute = (
      <Routes>
        <Route path="/add-author" element={<AddAuthor />} />
      </Routes>
    );
    wrapper = renderProviderWithRouter('/add-author', authorRoute);
  });

  afterAll(() => {
    server.shutdown();
  });

  test('Add Authors mounts properly', async () => {
    expect(wrapper).toBeTruthy();
  });

  test('it should add author', async () => {
    const testName = 'John Doe';
    await act(async () => {
      if (!wrapper) return;
      const inputField = wrapper.getByLabelText('Name');
      fireEvent.change(inputField, { target: { value: testName } });

      const submitButton = wrapper.getByText('Add');

      fireEvent.click(submitButton);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = await fetchAuthors();
      const name = data.authors[0].name;
      expect(name).toBe(testName);
    });
  });
});
