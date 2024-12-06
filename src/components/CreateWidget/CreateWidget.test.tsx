import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { mocked } from 'jest-mock';
import { act } from 'react-dom/test-utils';
import * as apiConnect from '../../lib/apiConnect';
import CreateWidget from './CreateWidget';
import { createWidget } from '../../lib/apiConnect';

jest.mock('../../lib/apiConnect');

describe('CreateWidget', () => {
    it('renders elements correctly', () => {
        render(<CreateWidget />);

        expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Price/i)).toBeInTheDocument();
        expect(screen.getByText('Create')).toBeInTheDocument();
    });

    /*it('creates a widget and shows a success message', async () => {
        const newWidget = { name: 'Widget1', description: 'Test widget', price: 19.45 };
        mocked(apiConnect.createWidget).mockResolvedValue(newWidget);

        render(<CreateWidget />);

        fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: newWidget.name } });
        fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: newWidget.description } });
        fireEvent.change(screen.getByLabelText(/Price/i), { target: { value: newWidget.price.toString() } });

        await act(async () => {
            await waitFor(() => expect(screen.getByText('Create')).toBeEnabled());

            fireEvent.click(screen.getByText('Create'));
        });

        await waitFor(() => {
            expect(screen.getByText(`Widget ${newWidget.name} created successfully.`)).toBeInTheDocument();
        });
    });

    it('shows error message when creation fails', async () => {
        const errorMessage = 'An unexpected error occurred';
        mocked(apiConnect.createWidget).mockRejectedValueOnce({ response: { status: 400, data: errorMessage } });

        render(<CreateWidget />);

        fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Widget1' } });
        fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Test widget' } });
        fireEvent.change(screen.getByLabelText(/Price/i), { target: { value: '15.50' } });

        await act(async () => {
            await waitFor(() => expect(screen.getByText('Create')).toBeEnabled());

            fireEvent.click(screen.getByText('Create'));
        });

        await waitFor(() => {
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
        });
    });*/
});
