interface IOrderProduct {
            productId: {
                        _id: string;
                        title: string;
                        images: string[];
                        price: number;
            };
            quantity: number;
            priceAtPurchase: number;
}

export interface IOrder {
            _id: string;
            userId: string;
            products: IOrderProduct[];
            paymentStatus: 'pending' | 'paid' | 'failed';
            orderStatus: 'pending' | 'shipped' | 'delivered' | 'cancelled';
            address: {
                        street: string;
                        city: string;
                        state: string;
                        pincode: string;
                        phone: string;
            };
            paymentId?: string;
            totalAmount: number;
            razorpayOrderId: string;
            createdAt: string;
            updatedAt: string;
}
