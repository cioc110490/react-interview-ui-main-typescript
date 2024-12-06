import { render, screen, fireEvent } from '@testing-library/react';
import SideBar, { SideBarItem } from './SideBar';

const mockSetSelected = jest.fn();

describe('SideBar', () => {
    it('renders all SideBarItem components', () => {
        render(<SideBar selected="List" setSelected={mockSetSelected} />);

        expect(screen.getByText('List')).toBeInTheDocument();
        expect(screen.getByText('Create')).toBeInTheDocument();
        expect(screen.getByText('Update')).toBeInTheDocument();
        expect(screen.getByText('Find')).toBeInTheDocument();
        expect(screen.getByText('Delete')).toBeInTheDocument();
    });
});

describe('SideBarItem', () => {
    it('calls setSelected when clicked', () => {
        render(<SideBarItem title="Create" selected="List" setSelected={mockSetSelected} />);

        const button = screen.getByText('Create');
        fireEvent.click(button);

        expect(mockSetSelected).toHaveBeenCalledWith('Create');
    });
});

