import { asapScheduler, BehaviorSubject, Observable } from 'rxjs';
import { observeOn } from 'rxjs/operators';
function createCart() {
    const cart = { items: [], totalPrice: 0, totalQuantity: 0 };
    const source = new BehaviorSubject(cart);
    return {
        value$: source.asObservable(),
        setItems: (items) => setItems(source, items),
        addItem: (item) => addItem(source, item),
        updateItem: (item) => updateItem(source, item),
        removeItem: (item) => removeItem(source, item),
        clearCart: () => clearCart(source)
    };
}
function setItems(source, items) {
    const currentStore = source.getValue();
    source.next({
        items: [...items],
        totalPrice: currentStore.items.reduce((totalPrice, item) => totalPrice + item.price, 0),
        totalQuantity: currentStore.items.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0)
    });
    return source.getValue();
}
function addItem(source, item) {
    return new Observable((observer) => {
        const { items } = source.getValue();
        const updatedItems = [...items, item];
        setItems(source, updatedItems);
        observer.next(source.getValue());
        observer.complete();
    }).pipe(observeOn(asapScheduler));
}
function updateItem(source, item) {
    return new Observable();
}
function removeItem(source, item) {
    return new Observable();
}
function clearCart(source) {
    return new Observable((observer) => {
        setItems(source, []);
        observer.next(source.getValue());
        observer.complete();
    }).pipe(observeOn(asapScheduler));
}
export { createCart };
//# sourceMappingURL=RxCart.utils.js.map