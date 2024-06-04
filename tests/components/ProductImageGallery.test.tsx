import { render, screen } from '@testing-library/react';
import ProductImageGallery from '../../src/components/ProductImageGallery';

describe('Product Image Gallery', () => {
    it('should render an empty arrray', () => {
        const {container} = render(<ProductImageGallery imageUrls={[]}/>);
        expect(container).toBeEmptyDOMElement();

    });

    it('should render a list of images', () => {
        const imageUrls = [
            'https://picsum.photos/id/237/200/300',
            'https://picsum.photos/id/238/200/300'
        ];
        render(<ProductImageGallery imageUrls={imageUrls}/>);
        const images = screen.getAllByRole('img');
        expect(images).toHaveLength(2);
        imageUrls.forEach((url,index) => {
            expect(images[index]).toHaveAttribute('src',url);
        })

    })
})