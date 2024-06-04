import { render, screen } from '@testing-library/react';
import UserAccount from '../../src/components/UserAccount';
import {User} from '../../src/entities';

describe('User Account', ()=> {
    it('should display user name', () => {
        const user: User = {id: 2, name: 'fathima'};
        render(<UserAccount user={user}/>);
        const name = screen.getByText(user.name);
        expect(name).toBeInTheDocument();
        expect(name).toHaveTextContent(/fathima/i);

        const heading = screen.getByRole('heading');
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent('User Profile');
    });

    it('should display edit button for admin', () => {
        const user: User = {id: 2, name: 'fathima',isAdmin: true};
        render(<UserAccount user={user}/>);
        const edit = screen.getByRole('button');
        expect(edit).toBeInTheDocument();
        expect(edit).toHaveTextContent(/edit/i);
    });

    it('should not display edit button', () => {
        render(<UserAccount user={{id: 2, name: 'fathima',isAdmin: false}}/>);
        const edit = screen.queryByRole('button');
        expect(edit).not.toBeInTheDocument();
    });
})