export type Product = {
            id: number;
            name: string;
            price: number;
            sold: number;
            stock: number;
            category: string;
};


export type StatCardProps = {
            title: string;
            value: string | number;
            change: string;
            icon: React.ComponentType<{ className?: string }>;
};
