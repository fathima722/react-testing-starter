import { render, screen, waitFor } from '@testing-library/react';
import TagList from '../../src/components/TagList';

describe('TagList', () => {
    it('should render tags', async() => {
        render(<TagList/>);

        // await waitFor(() => {   //  Keeps calling this callback until it timesout which means we should not have any code in waitFor() that would cause sideEffects. Include only assertions in waitFor() as it waits for a certain time to keep checking for the expected result.
        //     const listItems = screen.getAllByRole('listitem');
        //     expect(listItems.length).toBeGreaterThan(0);
        // })

        const listItems = await screen.findAllByRole('listitem'); //FindBy is a combination of waitFor and getBy
        expect(listItems.length).toBeGreaterThan(0);
    })
})
