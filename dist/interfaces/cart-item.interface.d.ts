export interface CartItem<T> {
    item?: T;
    id: string;
    name: string;
    price: number;
    quantity: number;
}
