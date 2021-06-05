import { Observable } from 'rxjs';
import { Cart, CartItem } from '../interfaces';
export { cart$, getCart, addItem, updateItem, removeItem, clearCart };
declare const cart$: Observable<Cart>;
declare function getCart(): Cart;
declare function addItem(item: CartItem): Observable<Cart>;
declare function updateItem(item: CartItem): Observable<Cart>;
declare function removeItem(item: CartItem): Observable<Cart>;
declare function clearCart(): Observable<Cart>;
