import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DocsContentSection from './DocsContentSection';

describe('<DocsContentSection />', () => {
  test('it should mount', () => {
    render(<DocsContentSection />);
    
    const docsContentSection = screen.getByTestId('DocsContentSection');

    expect(docsContentSection).toBeInTheDocument();
  });
});