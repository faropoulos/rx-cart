import { CartItem } from './cart-item.interface';
export interface Cart<T> {
    items: CartItem<T>[];
    totalPrice: number;
    totalQuantity: number;
}
