import { CartItem } from './cart-item.interface';

export interface Cart<T = void> {
  items: CartItem<T>[];
  totalPrice: number;
  totalQuantity: number;
}
