import { render, screen } from '@testing-library/react';
import TermsAndConditions from '../../src/components/TermsAndConditions';
import userEvent from '@testing-library/user-event';

describe('Terms And Conditions', () => {

    const renderEverything =() => {
        render(<TermsAndConditions/>);
        const heading = screen.getByRole('heading');
        const checkbox = screen.getByRole('checkbox');
        const button = screen.getByRole('button');

        return {heading,checkbox,button};
    }

    it('should render the terms and conditions with button disabled initially', () => {
        const {heading,checkbox,button} = renderEverything();
        expect(heading).toHaveTextContent('Terms & Conditions');

        expect(checkbox).toBeInTheDocument();
        expect(checkbox).not.toBeChecked();

        expect(button).toHaveTextContent(/submit/i);
        expect(button).toBeDisabled();
    });

    it('should render the terms and conditions with button enabled when checkbox is checked', async() => {
        //Arrange
        const {checkbox,button} = renderEverything();
 
        //Act
        expect(checkbox).toBeInTheDocument();
        const user = userEvent.setup();
        await user.click(checkbox);
        // expect(checkbox).toBeChecked();

        //Assert
        expect(button).toHaveTextContent(/submit/i);
        expect(button).toBeEnabled();
    });
})