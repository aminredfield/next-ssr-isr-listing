import { Product } from './product';

/**
 * Элемент корзины - товар + количество
 */
export interface CartItem {
    product: Product;
    quantity: number;
}

/**
 * Состояние корзины
 */
export interface CartState {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
}