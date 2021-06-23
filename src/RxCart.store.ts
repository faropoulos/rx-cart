import { Cart, CartItem, CartStore } from 'interfaces';
import { BehaviorSubject } from 'rxjs';
import { setItems, addItem, updateItem, removeItem, clearCart } from './RxCart.utils';

export function createCartStore<T>(): CartStore<T> {
  const source = new BehaviorSubject<Cart<T>>({ items: [] as CartItem<T>[], totalPrice: 0, totalQuantity: 0 });

  return {
    cart: source.getValue(),
    cart$: source.asObservable(),
    setItems: (items: CartItem<T>[]) => setItems(source, items),
    addItem: (item: CartItem<T>) => addItem(source, item),
    updateItem: (item: CartItem<T>) => updateItem(source, item),
    removeItem: (item: CartItem<T>) => removeItem(source, item),
    clearCart: () => clearCart(source)
  };
}
