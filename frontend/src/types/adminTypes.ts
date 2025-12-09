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

export type SimilarType = {
            _id: string;
            title: string;
            description: string;
            price: number;
            images: string[];
            stock: number;
            isFeatured: boolean;
            ratingsAverage: number;
            ratingsCount: number;
            searchText: string;
            createdBy: string;
            createdAt: string;
            updatedAt: string;
            embeddingVector: number[]; // if it exists but empty
};

