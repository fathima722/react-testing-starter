import { render, screen } from '@testing-library/react';
import SearchBox from '../../src/components/SearchBox';
import userEvent from '@testing-library/user-event';

describe('SearchBox',() => {
    const renderFunction = () => {
        const onChangeMock = vi.fn();
        render(<SearchBox onChange={onChangeMock}/>);

        return {
            inputValue: screen.getByPlaceholderText(/search/i),
            onChange: onChangeMock,
            user: userEvent.setup()
        }
    }
    it('Should render input field for searching',() => {
        const {inputValue} = renderFunction();
        expect(inputValue).toBeInTheDocument();
    });

    it('should call onChange function',async() => {
        const {inputValue,onChange,user} = renderFunction();
        const searchTerm = 'abc';

        await user.type(inputValue,searchTerm + "{enter}");

        // expect(onChange).toHaveBeenCalled();
        expect(onChange).toHaveBeenCalledWith(searchTerm);
    });

    it('should not call onChange function when input is empty',async() => {
        const {inputValue,onChange,user} = renderFunction();

        await user.type(inputValue, "{enter}");

        expect(onChange).not.toHaveBeenCalled();
    });
})