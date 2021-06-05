import { CartItem } from 'interfaces';
import { CartStore } from './cart';

const item1: CartItem = {
  id: 'id1',
  name: 'Item 1',
  price: 10,
  quantity: 1
};

const updatedItem1: CartItem = {
  id: 'id1',
  name: 'Item 1 UPDATED',
  price: 10,
  quantity: 4
};

const item2: CartItem = {
  id: 'id2',
  name: 'Item 2',
  price: 12,
  quantity: 2
};

// interface BOXProduct {
//     _id: string;
//     name: string;
//   }

// const item1: CartItem<BOXProduct> = {
//   id: 'id1',
//   name: 'Item 1',
//   price: 10,
//   quantity: 1,
//   item: {
//     _id: '123123213',
//     name: 'BOX Product'
//   }
// };

// const updatedItem1: CartItem<BOXProduct> = {
//   id: 'id1',
//   name: 'Item 1 UPDATED',
//   price: 10,
//   quantity: 4,
//   item: {
//     _id: '123123213',
//     name: 'BOX Product'
//   }
// };

// const item2: CartItem<BOXProduct> = {
//   id: 'id2',
//   name: 'Item 2',
//   price: 12,
//   quantity: 2,
//   item: {
//     _id: '123123213',
//     name: 'BOX Product'
//   }
// };

CartStore.cart$.subscribe({ next: console.log, error: console.error });
CartStore.addItem(item1).subscribe(() => console.log('INSIDE ADD ITEM 1'));
CartStore.addItem(item2).subscribe(() => console.log('INSIDE ADD ITEM 2'));
CartStore.updateItem(updatedItem1).subscribe({
  next: () => console.log('INSIDE UPDATE ITEM 1 NEXT'),
  error: () => console.error('UPDATE ITEM 1 ERROR'),
  complete: () => console.log('INSIDE UPDATE ITEM 1 COMPLETE')
});
CartStore.removeItem(item1).subscribe(() => console.log('INSIDE REMOVE ITEM 1'));
CartStore.removeItem(item1).subscribe({
  next: () => console.log('INSIDE REMOVE ITEM 1 NEXT'),
  error: () => console.error('REMOVE ITEM 1 ERROR'),
  complete: () => console.log('INSIDE REMOVE ITEM 1 COMPLETE')
});
CartStore.clearCart().subscribe(() => console.log('INSIDE CLEAR'));
console.log('AFTER ADD');
