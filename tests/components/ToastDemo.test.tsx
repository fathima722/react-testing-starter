import { render, screen } from '@testing-library/react';
import ToastDemo from '../../src/components/ToastDemo';
import userEvent from '@testing-library/user-event';
import {Toaster} from 'react-hot-toast';

describe('ToastDemo',() => {
    it('should render a toast',async () => {
        render(<>
            <ToastDemo/>
            <Toaster/>
        </>);

        const button = screen.getByRole('button');
        expect(button).toHaveTextContent(/toast/i);

        const user = userEvent.setup();
        await user.click(button);
        
        const successToast = await screen.findByText(/success/i);
        expect(successToast).toBeInTheDocument();

    })
})