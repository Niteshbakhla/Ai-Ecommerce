import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/product.service";
import ProductCard from "@/components/common/ProductCard";
import { useState } from "react";
import SearchBar from "@/components/common/SearchBar";
import { useDebounce } from "use-debounce";
import { useProducts } from "@/hooks/useAdminDashboard";





export default function Home() {
            const [page, setPage] = useState(1);
            const [search, setSearch] = useState("");
            const [debouncedSearch] = useDebounce(search, 300);

            // const { data, isLoading, isError, isFetching } = useQuery({
            //             queryKey: ["products", page, debouncedSearch],
            //             queryFn: () => getProducts(page, debouncedSearch),
            // });

            const { data, isLoading, isError, isFetching } = useProducts(page, debouncedSearch);


            return (
                        <div>
                                    <SearchBar setSearch={setSearch} />

                                    {isLoading && (
                                                <p className="text-center mt-10">Loading products...</p>
                                    )}

                                    {isError && (
                                                <p className="text-center mt-10 text-red-500">Failed to load products.</p>
                                    )}

                                    {!isLoading && !isError && (
                                                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
                                                            {data?.map((p: any) => (
                                                                        <ProductCard key={p._id} product={p} />
                                                            ))}
                                                </div>
                                    )}

                                    {isFetching && !isLoading && (
                                                <p className="text-center text-sm text-gray-500">Updating...</p>
                                    )}

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
