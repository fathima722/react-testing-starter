import { render, screen } from '@testing-library/react';
import TermsAndConditions from '../../src/components/TermsAndConditions';
import userEvent from '@testing-library/user-event';

describe('Terms And Conditions', () => {
    it('should render the terms and conditions with button disabled initially', () => {
        render(<TermsAndConditions />);
        const heading = screen.getByRole('heading');
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent('Terms & Conditions');

        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).not.toBeChecked();

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent(/submit/i);
        expect(button).toBeDisabled();
    });

    it('should render the terms and conditions with button enabled when checkbox is checked', async() => {
        //Arrange
        render(<TermsAndConditions />);

        //Act
        const checkbox = screen.getByRole('checkbox');
        const user = userEvent.setup();
        await user.click(checkbox);

        //Assert
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent(/submit/i);
        expect(button).toBeEnabled();
    });
})