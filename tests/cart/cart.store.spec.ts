import { Cart, CartItem } from '../../src/interfaces';
import * as RxCart from '../../src/RxCart';

describe('Cart Store', () => {
  const EMPTY_CART: Cart = { items: [], totalPrice: 0, totalQuantity: 0 };

  describe('getCart', () => {
    it('Should have an initial value', () => {
      const cart = RxCart.getCart();
      expect(cart).toStrictEqual(EMPTY_CART);
    });
  });

  describe('addItem', () => {
    const item1: CartItem = { id: 'id1', name: 'Item 1', price: 10, quantity: 1 };

    it('Should add the Item into the Cart', (done) => {
      const cart = RxCart.getCart();
      expect(cart).toStrictEqual(EMPTY_CART);
      RxCart.addItem(item1).subscribe(() => {
        const updatedCart = RxCart.getCart();
        expect(updatedCart.items).toStrictEqual([item1]);
        done();
      });
    });
  });
});
