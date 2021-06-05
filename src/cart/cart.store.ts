import { asapScheduler, BehaviorSubject, Observable, Observer } from 'rxjs';
import { observeOn } from 'rxjs/operators';
import { Cart, CartItem } from '../interfaces';

export { cart$, getCart, addItem, updateItem, removeItem, clearCart };

const DEFAULT_CART: Cart = { items: [], totalPrice: 0, totalQuantity: 0 };

const cartSource: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(DEFAULT_CART);
const cart$: Observable<Cart> = cartSource.asObservable();

function getCart(): Cart {
  return cartSource.getValue();
}

function setCartItems(items: CartItem[]): void {
  const currentStore = cartSource.getValue();
  currentStore.items = items;
  currentStore.totalPrice = currentStore.items.reduce((totalPrice, item) => totalPrice + item.price, 0);
  currentStore.totalQuantity = currentStore.items.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0);
  cartSource.next(currentStore);
}

function addItem(item: CartItem): Observable<Cart> {
  return new Observable((observer: Observer<Cart>) => {
    const { items: cartItems } = cartSource.getValue();
    cartItems.push(item);
    setCartItems(cartItems);
    observer.next(getCart());
    observer.complete();
  }).pipe(observeOn(asapScheduler));
}

function updateItem(item: CartItem): Observable<Cart> {
  return new Observable((observer: Observer<Cart>) => {
    const { items: cartItems } = cartSource.getValue();
    const currentIndex = cartItems.findIndex((currentItem) => currentItem.id === item.id);
    if (currentIndex === -1) return observer.error('ITEM_NOT_FOUND');
    cartItems[currentIndex] = item;
    setCartItems(cartItems);
    observer.next(getCart());
    observer.complete();
  }).pipe(observeOn(asapScheduler));
}

function removeItem(item: CartItem): Observable<Cart> {
  return new Observable((observer: Observer<Cart>) => {
    const { items: cartItems } = cartSource.getValue();
    const currentIndex = cartItems.findIndex((currentItem) => currentItem.id === item.id);
    if (currentIndex === -1) return observer.error('ITEM_NOT_FOUND');
    cartItems.splice(currentIndex, 1);
    setCartItems(cartItems);
    observer.next(getCart());
    observer.complete();
  }).pipe(observeOn(asapScheduler));
}

function clearCart(): Observable<Cart> {
  return new Observable((observer: Observer<Cart>) => {
    setCartItems([]);
    observer.next(getCart());
    observer.complete();
  }).pipe(observeOn(asapScheduler));
}
