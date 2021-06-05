"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCart = exports.removeItem = exports.updateItem = exports.addItem = exports.getCart = exports.cart$ = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const DEFAULT_CART = { items: [], totalPrice: 0, totalQuantity: 0 };
const cartSource = new rxjs_1.BehaviorSubject(DEFAULT_CART);
const cart$ = cartSource.asObservable();
exports.cart$ = cart$;
function getCart() {
    return cartSource.getValue();
}
exports.getCart = getCart;
function setCartItems(items) {
    const currentStore = cartSource.getValue();
    currentStore.items = items;
    currentStore.totalPrice = currentStore.items.reduce((totalPrice, item) => totalPrice + item.price, 0);
    currentStore.totalQuantity = currentStore.items.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0);
    cartSource.next(currentStore);
}
function addItem(item) {
    return new rxjs_1.Observable((observer) => {
        const { items: cartItems } = cartSource.getValue();
        cartItems.push(item);
        setCartItems(cartItems);
        observer.next(getCart());
        observer.complete();
    }).pipe(operators_1.observeOn(rxjs_1.asapScheduler));
}
exports.addItem = addItem;
function updateItem(item) {
    return new rxjs_1.Observable((observer) => {
        const { items: cartItems } = cartSource.getValue();
        const currentIndex = cartItems.findIndex((currentItem) => currentItem.id === item.id);
        if (currentIndex === -1)
            return observer.error('ITEM_NOT_FOUND');
        cartItems[currentIndex] = item;
        setCartItems(cartItems);
        observer.next(getCart());
        observer.complete();
    }).pipe(operators_1.observeOn(rxjs_1.asapScheduler));
}
exports.updateItem = updateItem;
function removeItem(item) {
    return new rxjs_1.Observable((observer) => {
        const { items: cartItems } = cartSource.getValue();
        const currentIndex = cartItems.findIndex((currentItem) => currentItem.id === item.id);
        if (currentIndex === -1)
            return observer.error('ITEM_NOT_FOUND');
        cartItems.splice(currentIndex, 1);
        setCartItems(cartItems);
        observer.next(getCart());
        observer.complete();
    }).pipe(operators_1.observeOn(rxjs_1.asapScheduler));
}
exports.removeItem = removeItem;
function clearCart() {
    return new rxjs_1.Observable((observer) => {
        setCartItems([]);
        observer.next(getCart());
        observer.complete();
    }).pipe(operators_1.observeOn(rxjs_1.asapScheduler));
}
exports.clearCart = clearCart;
//# sourceMappingURL=cart.store.js.map