import {
  describe,
  test,
  expect,
  beforeEach,
  afterAll,
} from 'vitest';
import { RenderResult, act, fireEvent } from '@testing-library/react';
import { EditAuthor } from './edit';
import { Route, Routes } from 'react-router-dom';
import makeServer from '../../mirage/server';
import { fetchAuthors } from '../../services/authors';
import { renderProviderWithRouter } from '../../utils/testUtils';

describe('<EditAuthor />', () => {
  let wrapper: RenderResult<
    typeof import('@testing-library/dom/types/queries'),
    HTMLElement,
    HTMLElement
  > | null = null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let server: any = null;

  beforeEach(() => {
    if (process.env.NODE_ENV === 'test' && !server) {
      server = makeServer({ environment: 'test' });
      server.create('author', { name: 'John doe' });
    }
    const authorRoute = (
      <Routes>
        <Route path="/author/:id" element={<EditAuthor />} />
      </Routes>
    );
    wrapper = renderProviderWithRouter('/author/1', authorRoute);
  });

  afterAll(() => {
    server.shutdown();
  });

  test('Add Authors mounts properly', async () => {
    expect(wrapper).toBeTruthy();
  });

  test('it should update author', async () => {
    const testName = 'John Doi';
    expect(wrapper).toBeTruthy();
    await act(async () => {
      if (!wrapper) return;
      const inputField = wrapper.getByLabelText('Name');
      fireEvent.change(inputField, { target: { value: testName } });

      const submitButton = wrapper.getByText('Update');

      fireEvent.click(submitButton);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = await fetchAuthors();
      const name = data.authors[0].name;
      expect(name).toBe(testName);
    });
  });
});
