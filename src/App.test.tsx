import { describe, test, expect } from 'vitest';
import { App } from './App';
import { renderWithProviders } from './utils/testUtils';

describe('<App />', () => {
  test('App mounts properly', () => {
    const wrapper = renderWithProviders(<App />);
    expect(wrapper).toBeTruthy();
  });
});
