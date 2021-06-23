import { Cart, CartItem } from 'interfaces';
import { asapScheduler, BehaviorSubject, Observable, Observer } from 'rxjs';
import { observeOn } from 'rxjs/operators';

function setItems<T>(source: BehaviorSubject<Cart<T>>, items: CartItem<T>[]): Cart<T> {
  source.next({
    items: [...items],
    totalPrice: items.reduce((totalPrice, item) => totalPrice + item.price, 0),
    totalQuantity: items.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0)
  });
  return source.getValue();
}

function addItem<T>(source: BehaviorSubject<Cart<T>>, item: CartItem<T>): Observable<Cart<T>> {
  return new Observable((observer: Observer<Cart<T>>) => {
    const { items } = source.getValue();
    const updatedItems = [...items, item];
    setItems<T>(source, updatedItems);
    observer.next(source.getValue());
    observer.complete();
  }).pipe(observeOn(asapScheduler));
}

function updateItem<T>(source: BehaviorSubject<Cart<T>>, item: CartItem<T>): Observable<Cart<T>> {
  // TODO find a better immutable way to update
  return new Observable((observer: Observer<Cart<T>>) => {
    const { items: cartItems } = source.getValue();
    const currentIndex = cartItems.findIndex((currentItem) => currentItem.id === item.id);
    if (currentIndex === -1) return observer.error('ITEM_NOT_FOUND');
    cartItems[currentIndex] = item;
    setItems<T>(source, cartItems);
    observer.next(source.getValue());
    observer.complete();
  }).pipe(observeOn(asapScheduler));
}

function removeItem<T>(source: BehaviorSubject<Cart<T>>, item: CartItem<T>): Observable<Cart<T>> {
  // TODO find a better immutable way to remove
  return new Observable((observer: Observer<Cart<T>>) => {
    const { items: cartItems } = source.getValue();
    const currentIndex = cartItems.findIndex((currentItem) => currentItem.id === item.id);
    if (currentIndex === -1) return observer.error('ITEM_NOT_FOUND');
    cartItems.splice(currentIndex, 1);
    setItems<T>(source, cartItems);
    observer.next(source.getValue());
    observer.complete();
  }).pipe(observeOn(asapScheduler));
}

function clearCart<T>(source: BehaviorSubject<Cart<T>>): Observable<Cart<T>> {
  return new Observable((observer: Observer<Cart<T>>) => {
    setItems<T>(source, []);
    observer.next(source.getValue());
    observer.complete();
  }).pipe(observeOn(asapScheduler));
}

export { setItems, addItem, updateItem, removeItem, clearCart };
