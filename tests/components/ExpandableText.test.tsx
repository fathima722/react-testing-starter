import { render, screen } from '@testing-library/react';
import ExpandableText from '../../src/components/ExpandableText';
import userEvent from '@testing-library/user-event';

describe('Expandable Text', () => {
    const limit = 255;
    const longText = 'a'.repeat(limit+1);
    const truncatedText = longText.substring(0,limit)+'...';

    it('should display just a short text', () => {
        render(<ExpandableText text='short text' />);
        const article = screen.getByRole('article');
        expect(article).toBeInTheDocument();
        expect(article).toHaveTextContent(/short/i)
    });

    it('should truncate text and display a button when the text limit is exceeded', () => {
        render(<ExpandableText text={longText} />);

        expect(screen.getByText(truncatedText)).toBeInTheDocument();

        const button = screen.queryByRole('button');
        expect(button).toHaveTextContent(/more/i);
    });

    it('should expand text when show more button is clicked', async() => {
        render(<ExpandableText text={longText} />);

        const button = screen.getByRole('button');
        const user = userEvent.setup();
        await user.click(button);

        expect(screen.getByText(longText)).toBeInTheDocument();
        expect(button).toHaveTextContent(/less/i);
    });

    it('should collapse the text when show less button is clicked', async() => {
        render(<ExpandableText text={longText} />);

        const showMoreButton = screen.getByRole('button', {name: /more/i});
        const user = userEvent.setup();
        await user.click(showMoreButton);

        const showLessButton = screen.getByRole('button', {name: /less/i})
        await user.click(showLessButton);

        expect(screen.getByText(truncatedText)).toBeInTheDocument();
        expect(showMoreButton).toHaveTextContent(/more/i);
    });
    
})