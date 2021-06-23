import { asapScheduler, BehaviorSubject, Observable } from 'rxjs';
import { observeOn } from 'rxjs/operators';
export { cart$, initializeCart, getCart, addItem, updateItem, removeItem, clearCart };
let cartSource;
let cart$;
function initializeCart() {
    const defaultCart = { items: [], totalPrice: 0, totalQuantity: 0 };
    cartSource = new BehaviorSubject(defaultCart);
    cart$ = cartSource.asObservable();
}
function getCart() {
    return cartSource.getValue();
}
function setCartItems(items) {
    const currentStore = cartSource.getValue();
    cartSource.next({
        items: [...items],
        totalPrice: currentStore.items.reduce((totalPrice, item) => totalPrice + item.price, 0),
        totalQuantity: currentStore.items.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0)
    });
}
function addItem(item) {
    return new Observable((observer) => {
        if (!cartSource)
            return observer.error('CART_NOT_INITIALIZED');
        const { items: cartItems } = cartSource.getValue();
        cartItems.push(item);
        setCartItems(cartItems);
        observer.next(getCart());
        observer.complete();
    }).pipe(observeOn(asapScheduler));
}
function updateItem(item) {
    return new Observable((observer) => {
        if (!cartSource)
            return observer.error('CART_NOT_INITIALIZED');
        const { items: cartItems } = cartSource.getValue();
        const currentIndex = cartItems.findIndex((currentItem) => currentItem.id === item.id);
        if (currentIndex === -1)
            return observer.error('ITEM_NOT_FOUND');
        cartItems[currentIndex] = item;
        setCartItems(cartItems);
        observer.next(getCart());
        observer.complete();
    }).pipe(observeOn(asapScheduler));
}
function removeItem(item) {
    return new Observable((observer) => {
        if (!cartSource)
            return observer.error('CART_NOT_INITIALIZED');
        const { items: cartItems } = cartSource.getValue();
        const currentIndex = cartItems.findIndex((currentItem) => currentItem.id === item.id);
        if (currentIndex === -1)
            return observer.error('ITEM_NOT_FOUND');
        cartItems.splice(currentIndex, 1);
        setCartItems(cartItems);
        observer.next(getCart());
        observer.complete();
    }).pipe(observeOn(asapScheduler));
}
function clearCart() {
    return new Observable((observer) => {
        if (!cartSource)
            return observer.error('CART_NOT_INITIALIZED');
        setCartItems([]);
        observer.next(getCart());
        observer.complete();
    }).pipe(observeOn(asapScheduler));
}
//# sourceMappingURL=RxCart.store.js.map