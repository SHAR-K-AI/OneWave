import { useDispatch } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import CreateTrackButton from '@/components/buttons/CreateTrackButton';

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
}));

describe('CreateTrackButton', () => {
    it('dispatches openModal when button is clicked', () => {
        const mockDispatch = jest.fn();
        (useDispatch as jest.Mock).mockReturnValue(mockDispatch); // повертаємо мок-диспетчер

        render(<CreateTrackButton />);

        const button = screen.getByTestId('create-track-button');
        expect(button).toBeInTheDocument();

        fireEvent.click(button);

        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'modal/openModal',
            payload: {
                modalType: 'CREATE_TRACK',
            },
        });
    });
});
