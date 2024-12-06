import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import FindWidget from './FindWidget';
import { findWidget } from '../../lib/apiConnect';
import { mocked } from 'jest-mock';

jest.mock('../../lib/apiConnect');

const mockedFindWidget = mocked(findWidget);

describe('FindWidget', () => {
    it('displays widget details when found', async () => {
        const widget = { name: 'Widget1', description: 'Test widget', price: 19.45 };
        mockedFindWidget.mockResolvedValueOnce(widget);

        render(<FindWidget />);

        fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: widget.name } });

        await act(async () => {
            fireEvent.click(screen.getByText('Find'));
        });

        await waitFor(() => {
            expect(screen.getByText(widget.description)).toBeInTheDocument();
            expect(screen.getByText(`$${widget.price}`)).toBeInTheDocument();
        });

        expect(mockedFindWidget).toHaveBeenCalledWith(widget.name);
    });

    it('shows not found message when widget does not exist', async () => {
        mockedFindWidget.mockResolvedValueOnce(null);

        render(<FindWidget />);

        fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Widget1' } });

        await act(async () => {
            fireEvent.click(screen.getByText('Find'));
        });

        await waitFor(() => {
            expect(screen.getByText('Widget Widget1 not found.')).toBeInTheDocument();
        });

        expect(mockedFindWidget).toHaveBeenCalledWith('Widget1');
    });

    it('disables the "Find" button when the name field is empty', () => {
        render(<FindWidget />);

        const findButton = screen.getByRole('button', { name: 'Find' });

        expect(findButton).toBeDisabled();

        fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Widget1' } });

        expect(findButton).toBeEnabled();
    });
});
