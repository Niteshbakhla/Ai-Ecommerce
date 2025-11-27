import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/product.service";
import ProductCard from "@/components/common/ProductCard";
import { useState } from "react";

export default function Home() {
            const [page, setPage] = useState(1);

            const { data, isLoading, isError } = useQuery({
                        queryKey: ["products", page],
                        queryFn: () => getProducts(page),
            });

            if (isLoading) return <p className="text-center mt-10">Loading products...</p>;
            if (isError) return <p className="text-center mt-10 text-red-500">Failed to load products.</p>;

            return (
                        <div>
                                    <h1 className="text-2xl font-bold mb-4">Featured Products</h1>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
                                                {data?.products.items?.map((p: any) => (
                                                            <ProductCard key={p._id} product={p} />
                                                ))}
                                    </div>

                                    {/* Pagination */}
                                    <div className="flex justify-center mt-6 gap-4">
                                                <button
                                                            disabled={page === 1}
                                                            onClick={() => setPage((p) => p - 1)}
                                                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                                                >
                                                            Prev
                                                </button>

                                                <button
                                                            disabled={!data?.hasNextPage}
                                                            onClick={() => setPage((p) => p + 1)}
                                                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                                                >
                                                            Next
                                                </button>
                                    </div>
                        </div>
            );
}
