import { Observable } from 'rxjs';
import { CartItem } from './cart-item.interface';
import { Cart } from './cart.interface';
export interface CartStore<T> {
    value$: Observable<Cart<T>>;
    setItems: (item: CartItem<T>[]) => Cart<T>;
    addItem: (item: CartItem<T>) => Observable<Cart<T>>;
    updateItem: (item: CartItem<T>) => Observable<Cart<T>>;
    removeItem: (item: CartItem<T>) => Observable<Cart<T>>;
    clearCart: () => Observable<Cart<T>>;
}
