import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { mocked } from 'jest-mock';
import { deleteWidget, findWidget } from '../../lib/apiConnect';
import DeleteWidget from './DeleteWidget';

jest.mock('../../lib/apiConnect');

const mockedDeleteWidget = mocked(deleteWidget);
const mockedFindWidget = mocked(findWidget);

describe('DeleteWidget', () => {
    it('deletes a widget and shows a success message', async () => {
        const widget = { name: 'Widget1', description: 'Test widget', price: 19.45 };

        mockedFindWidget.mockResolvedValueOnce(widget);
        mockedDeleteWidget.mockResolvedValueOnce();

        render(<DeleteWidget />);

        fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Widget1' } });

        await waitFor(() => {
            expect(screen.getByText('Widget found.')).toBeInTheDocument();
        });

        const deleteButton = screen.getByRole('button', { name: 'Delete' });
        expect(deleteButton).toBeEnabled();

        await act(async () => {
            fireEvent.click(deleteButton);
        });

        await waitFor(() => {
            expect(screen.getByText('Widget deleted successfully.')).toBeInTheDocument();
        });

        expect(mockedFindWidget).toHaveBeenCalledWith('Widget1');
        expect(mockedDeleteWidget).toHaveBeenCalledWith('Widget1');
    });

    it('disables the delete button when the widget is not found', async () => {
        mockedFindWidget.mockResolvedValueOnce(null);

        render(<DeleteWidget />);

        fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Widget1' } });

        await waitFor(() => {
            expect(screen.queryByText('Widget found.')).not.toBeInTheDocument();
        });

        const deleteButton = screen.getByRole('button', { name: 'Delete' });
        expect(deleteButton).toBeDisabled();
    });
});
