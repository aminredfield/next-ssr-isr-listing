/**
 * Данные формы оформления заказа
 */
export interface CheckoutFormData {
    // Личные данные
    firstName: string;
    lastName: string;
    email: string;
    phone: string;

    // Адрес доставки
    address: string;
    city: string;
    postalCode: string;
    country: string;

    // Способ оплаты
    paymentMethod: 'card' | 'cash' | 'paypal';

    // Дополнительно
    comments?: string;
}

/**
 * Заказ после оформления
 */
export interface Order {
    id: string;
    orderNumber: string;
    date: string;
    formData: CheckoutFormData;
    items: Array<{
        productId: string;
        title: string;
        price: number;
        quantity: number;
    }>;
    totalPrice: number;
    status: 'pending' | 'completed' | 'cancelled';
}