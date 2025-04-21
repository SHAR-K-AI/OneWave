import { render, screen } from '@testing-library/react';
import BackToTracksButton from "@/components/buttons/BackToTracksButton";

jest.mock('@heroicons/react/24/solid', () => ({
    ArrowLeftIcon: () => <svg data-testid="mock-arrow-icon" />,
}));

describe('BackToTracksButton', () => {
    it('renders the button with the correct label and icon', () => {
        render(<BackToTracksButton />);

        const button = screen.getByRole('link');
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('href', '/tracks');
        expect(screen.getByText('Back to Tracks')).toBeInTheDocument();
        expect(screen.getByTestId('mock-arrow-icon')).toBeInTheDocument();
    });
});
