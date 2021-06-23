import { CartItem } from '../src/interfaces';
import { createCartStore } from '../src/RxCart.store';

describe('RxCart Utilities', () => {
  describe('createCart', () => {
    // it('Should generate', () => {
    //   interface Product {
    //     id: string;
    //     name: string;
    //   }
    //   interface Offer {
    //     id: string;
    //     discount: string;
    //   }
    //   const cartProduct: CartItem<Product> = {
    //     name: 'Product 123',
    //     item: { id: '333', name: 'Product 333' },
    //     id: '123',
    //     quantity: 2,
    //     price: 10
    //   };
    //   const cartOffer: CartItem<Offer> = {
    //     name: 'Product 123',
    //     item: { id: '333', discount: 'Product 333' },
    //     id: '123',
    //     quantity: 2,
    //     price: 10
    //   };
    //   const cartStore = createCartStore<Product>();
    //   cartStore.cart$.subscribe((cart) => console.log(cart));
    //   cartStore.addItem(cartProduct).subscribe();
    //   cartStore.addItem(cartProduct).subscribe();
    //   cartStore.clearCart().subscribe();
    //   expect(1).toBe(1);
    // });
  });
});
