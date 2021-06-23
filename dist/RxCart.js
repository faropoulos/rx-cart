export * from './RxCart.store';
import { createCart } from 'RxCart.utils';
const cartProduct = {
    name: 'Product 123',
    item: { id: '333', name: 'Product 333' },
    id: '123',
    quantity: 2,
    price: 10
};
const cartOffer = {
    name: 'Product 123',
    item: { id: '333', discount: 'Product 333' },
    id: '123',
    quantity: 2,
    price: 10
};
const cart = createCart();
cart.value$.subscribe((cart) => console.log(cart));
cart.addItem(cartProduct);
cart.addItem(cartProduct);
cart.clearCart();
//# sourceMappingURL=RxCart.js.map