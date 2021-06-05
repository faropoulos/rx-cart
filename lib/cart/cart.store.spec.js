"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RxCart = require("./index");
describe('Cart Store', function () {
    var EMPTY_CART = { items: [], totalPrice: 0, totalQuantity: 0 };
    describe('getCart', function () {
        it('Should have an initial value', function () {
            var cart = RxCart.getCart();
            expect(cart).toStrictEqual(EMPTY_CART);
        });
    });
    describe('addItem', function () {
        var item1 = { id: 'id1', name: 'Item 1', price: 10, quantity: 1 };
        it('Should add the Item into the Cart', function (done) {
            var cart = RxCart.getCart();
            expect(cart).toStrictEqual(EMPTY_CART);
            RxCart.addItem(item1).subscribe(function () {
                var updatedCart = RxCart.getCart();
                expect(updatedCart.items).toStrictEqual([item1]);
                done();
            });
        });
    });
});
//# sourceMappingURL=cart.store.spec.js.map