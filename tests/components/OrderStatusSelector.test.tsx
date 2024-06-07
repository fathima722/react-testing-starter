import { render, screen } from '@testing-library/react';
import OrderStatusSelector from '../../src/components/OrderStatusSelector';
import { Theme } from '@radix-ui/themes';
import userEvent from '@testing-library/user-event';

describe('OrderStatusSelector', () => {
    const onChangeMock = vi.fn();
    const renderFunction = () => { // helper render function
        render(
            <Theme>
                <OrderStatusSelector onChange={onChangeMock}/>);
            </Theme>
        )

        return {
            button: screen.getByRole('combobox'),
            user: userEvent.setup(),
            getOptions: () => screen.findAllByRole('option'), // Lazy evaluation technique - postpose the execution of this piece of code to the future when we need it by converting it a function
            getOption: (label: RegExp) =>  screen.findByRole('option',{name: label}),
            onchangeMock: onChangeMock
        }
    }

    it('should render the dropdown with default value as New', () => {
        const {button} = renderFunction();

        // const button = screen.getByRole('combobox'); // inspect element on the dropdown in browser and you will see this custom role on the button
        expect(button).toHaveTextContent('New');

    });

    it('should render correct statuses', async () => {
        const {button,user,getOptions} = renderFunction();

        await user.click(button);

        const options = await getOptions();
        expect(options).toHaveLength(3);

        const labels = options.map(option => option.textContent);
        expect(labels).toEqual(['New','Processed','Fulfilled']);

    });

    it.each([
        {label: /processed/i, value: 'processed'},
        {label: /fulfilled/i, value:'fulfilled'}
    ])('should render the status with $value when the $label is selected from dropdown',async ( {label,value} ) => {
        const {button,user,onchangeMock,getOption} = renderFunction();

        await user.click(button);

       const selected = await getOption(label);
       await user.click(selected);

       expect(onchangeMock).toHaveBeenCalledWith(value);
    })

    it("should call onChange with 'new' when /new/i option is selected",async()=>{
        const {button,getOption,user,onchangeMock} = renderFunction();
        await userEvent.click(button);

        const processedOption = await getOption(/processed/i);
        await user.click(processedOption);

        await userEvent.click(button);
        const newOption = await getOption(/new/i);
        await user.click(newOption);

        expect(onchangeMock).toHaveBeenCalledWith("new");

    })
})