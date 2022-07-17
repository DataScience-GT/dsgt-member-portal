import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Parameter from './Parameter';

describe('<Parameter />', () => {
  test('it should mount', () => {
    render(<Parameter />);
    
    const parameter = screen.getByTestId('Parameter');

    expect(parameter).toBeInTheDocument();
  });
});