import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import InputItem from './InputItem';

describe('InputItem Component', () => {
    it('renders the component with the correct title and value', async () => {
        const mockSetValue = jest.fn();
        render(<InputItem title="Name" value="Widget1" setValue={mockSetValue} />);

        expect(screen.getByLabelText('Name')).toBeInTheDocument();

        const input = screen.getByLabelText('Name');
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue('Widget1');
    });

    it('calls setValue with the correct string value', () => {
        const mockSetValue = jest.fn();
        render(<InputItem title="Name" value="" setValue={mockSetValue} />);

        const input = screen.getByLabelText('Name');
        fireEvent.change(input, { target: { value: 'Widget1' } });

        expect(mockSetValue).toHaveBeenCalledWith('Widget1');
    });

    it('renders the component with numeric input type', () => {
        const mockSetValue = jest.fn();
        render(<InputItem title="Name" value={25} setValue={mockSetValue} numeric />);

        const input = screen.getByLabelText('Name');
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('type', 'number');
        expect(input).toHaveValue(25);
    });

    it('calls setValue with the correct numeric value on change', () => {
        const mockSetValue = jest.fn();
        render(<InputItem title="Name" value={0} setValue={mockSetValue} numeric />);

        const input = screen.getByLabelText('Name');
        fireEvent.change(input, { target: { value: '9.99' } });

        expect(mockSetValue).toHaveBeenCalledWith(9.99);
    });
});
