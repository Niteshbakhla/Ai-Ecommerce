export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'paid' | 'pending' | 'refunded';

export interface OrderItem {
            productName: string;
            quantity: number;
            price: number;
}

export interface Customer {
            name: string;
            email: string;
            phone: string;
}

export interface Order {
            _id: string;
            orderNumber: string;
            customer: Customer;
            items: OrderItem[];
            totalAmount: number;
            status: OrderStatus;
            paymentStatus: PaymentStatus;
            paymentMethod: string;
            shippingAddress: string;
            createdAt: string;
            shippedAt?: string;
            deliveredAt?: string;
            cancelledAt?: string;
}

export type FilterStatus = OrderStatus | 'all';


