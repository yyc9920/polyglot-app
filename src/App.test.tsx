import { render, screen } from '@testing-library/react';
import App from './App';
import { expect, test } from 'vitest';

test('renders app header', () => {
  render(<App />);
  // The header now contains "Polyglot", so we check for that instead of the old text.
  const headerElement = screen.getByText(/Polyglot/i);
  expect(headerElement).toBeInTheDocument();
});
