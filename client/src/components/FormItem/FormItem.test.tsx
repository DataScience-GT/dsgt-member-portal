import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormItem from './FormItem';

describe('<FormItem />', () => {
  test('it should mount', () => {
    render(<FormItem />);
    
    const formItem = screen.getByTestId('FormItem');

    expect(formItem).toBeInTheDocument();
  });
});