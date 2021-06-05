export interface CartItem<T = void> {
    item?: T;
    id: string;
    name: string;
    price: number;
    quantity: number;
}
