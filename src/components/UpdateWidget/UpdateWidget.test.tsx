import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { mocked } from 'jest-mock';
import { findWidget, updateWidget } from '../../lib/apiConnect';
import UpdateWidget from './UpdateWidget';

jest.mock('../../lib/apiConnect');

const mockedUpdateWidget = mocked(updateWidget);
const mockedFindWidget = mocked(findWidget);

describe('UpdateWidget', () => {
    it('updates widget successfully', async () => {
        const widget = { name: 'Widget1', description: 'Test widget', price: 19.45 };
        mockedUpdateWidget.mockResolvedValueOnce(widget);

        render(<UpdateWidget />);

        fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: widget.name } });
        fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Updated description' } });
        fireEvent.change(screen.getByLabelText(/Price/i), { target: { value: '10' } });

        await waitFor(() => expect(screen.getByText('Update')).toBeEnabled());

        fireEvent.click(screen.getByText('Update'));

        await waitFor(() => {
            expect(screen.getByText(`Widget ${widget.name} updated successfully.`)).toBeInTheDocument();
        });

        expect(mockedUpdateWidget).toHaveBeenCalledWith({ name: widget.name, description: 'Updated description', price: 10 });
    });

    it('displays validation error when inputs are invalid', async () => {
        render(<UpdateWidget />);

        fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'W' } });
        fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Valid description' } });
        fireEvent.change(screen.getByLabelText(/Price/i), { target: { value: '10' } });

        expect(screen.getByText('Update')).toBeDisabled();
    });

    it('checks if widget already exists on name change', async () => {
        const widget = { name: 'Widget1', description: 'Test widget', price: 19.45 };

        mockedFindWidget.mockResolvedValueOnce(widget);

        render(<UpdateWidget />);

        fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: widget.name } });

        await waitFor(() => {
            expect(screen.getByText('Widget found.')).toBeInTheDocument();
        });
    });
});
