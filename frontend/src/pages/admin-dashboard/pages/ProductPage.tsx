import { useState, type FormEvent } from 'react';
import { Package, X, Plus, Search, Edit2, Trash2, Star, Image as ImageIcon, Loader2 } from 'lucide-react';
import type { ProductFormData, Product, SimilarType } from '@/types/adminTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct, deleteProduct, updateProduct } from '@/api/products';
import { useProducts } from '@/hooks/useAdminDashboard';
import toast from 'react-hot-toast';
import { uploadImageToCloudinary } from "@/api/cloudinary.api"


export default function Product() {
            const [showProductModal, setShowProductModal] = useState(false);
            const [searchQuery, setSearchQuery] = useState('');
            const [editingProduct, setEditingProduct] = useState<Product | null>(null);
            const [page] = useState(1);
            const [search] = useState("");
            const queryClient = useQueryClient();
            const [productId, setProductId] = useState("");


            const [formData, setFormData] = useState<ProductFormData>({
                        title: '',
                        description: '',
                        price: '',
                        images: [],
                        stock: '',
                        isFeatured: false
            });


            const handleAddProduct = () => {
                        setEditingProduct(null);
                        setFormData({
                                    title: '',
                                    description: '',
                                    price: "",
                                    images: [],
                                    stock: '',
                                    isFeatured: false
                        });
                        console.log(formData);

                        setShowProductModal(true);
            };


            const addProductMutation = useMutation({
                        mutationKey: ["add-product"],
                        mutationFn: createProduct,
                        onSuccess: (data) => {
                                    toast.success(data.message)
                                    queryClient.invalidateQueries({ queryKey: ["products"] });
                        },
                        onError: (data) => {
                                    toast.error(data.message)
                        }
            });

            const updateProductMutation = useMutation({
                        mutationKey: ["update-product"],
                        mutationFn: updateProduct,
                        onSuccess: (data) => {
                                    toast.success(data.message);
                                    setShowProductModal(false)
                                    queryClient.invalidateQueries({ queryKey: ["products"] });
                        },
                        onError: () => {
                                    toast.error("Failed to update product");
                        },
            });


            const handleEditProduct = (product: any) => {
                        setEditingProduct(product);
                        setFormData({
                                    title: product.title,
                                    description: product.description,
                                    price: product.price,
                                    images: product.images,
                                    stock: product.stock,
                                    isFeatured: product.isFeatured
                        });

                        setShowProductModal(true);
            };


            const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
                        e.preventDefault();

                        addProductMutation.mutate(formData)

                        setShowProductModal(false);
            };


            const editProduct = () => {
                        updateProductMutation.mutate({
                                    id: productId,
                                    updateData: formData,
                        });
            }


            const deleteProductMutation = useMutation({
                        mutationFn: deleteProduct,
                        onSuccess: () => {
                                    queryClient.invalidateQueries({ queryKey: ["products"] });
                        }
            })

            const { data, isPending } = useProducts(page, search);


            const handleImageUpload = async (
                        e: React.ChangeEvent<HTMLInputElement>
            ) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        try {
                                    toast.loading("Uploading image...");

                                    const imageUrl = await uploadImageToCloudinary(file);

                                    setFormData((prev) => ({
                                                ...prev,
                                                images: [imageUrl],
                                    }));

                                    toast.dismiss();
                                    toast.success("Image uploaded");
                        } catch (error) {
                                    toast.dismiss();
                                    toast.error("Image upload failed");
                        }
            };




            return (
                        <div className="flex h-screen bg-gray-50">
                                    {/* Main Content */}
                                    <main className="flex-1 overflow-auto">

                                                {/* Products Content */}
                                                <div className="p-8">
                                                            {/* Search and Add Bar */}
                                                            <div className="flex items-center gap-4 mb-6">
                                                                        <div className="flex-1 relative">
                                                                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                                                                    <input
                                                                                                type="text"
                                                                                                placeholder="Search products..."
                                                                                                value={searchQuery}
                                                                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                                                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                                                    />
                                                                        </div>
                                                                        <button
                                                                                    onClick={handleAddProduct}
                                                                                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-sm"
                                                                        >
                                                                                    <Plus size={20} />
                                                                                    {/* Add Product */}
                                                                        </button>
                                                            </div>

                                                            {/* Products Grid */}
                                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                                        {
                                                                                    isPending ? <h1> <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" /> loading Products</h1> :
                                                                                                data.map((product: SimilarType) => (
                                                                                                            <div key={product._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                                                                                                                        {/* Product Image */}
                                                                                                                        <div className="h-48 bg-gray-100 flex items-center justify-center relative">
                                                                                                                                    {product.images.length > 0 ? (
                                                                                                                                                <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
                                                                                                                                    ) : (
                                                                                                                                                <ImageIcon size={48} className="text-gray-300" />
                                                                                                                                    )}
                                                                                                                                    {product.isFeatured && (
                                                                                                                                                <span className="absolute top-3 right-3 px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full">
                                                                                                                                                            FEATURED
                                                                                                                                                </span>
                                                                                                                                    )}
                                                                                                                        </div>

                                                                                                                        {/* Product Details */}
                                                                                                                        <div className="p-5">
                                                                                                                                    <div className="flex items-start justify-between mb-2">
                                                                                                                                                <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{product.title}</h3>
                                                                                                                                                <span className="text-xl font-bold text-blue-600">${product.price}</span>
                                                                                                                                    </div>

                                                                                                                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

                                                                                                                                    <div className="flex items-center gap-4 mb-4 text-sm">
                                                                                                                                                <div className="flex items-center gap-1">
                                                                                                                                                            <Star size={16} className="text-yellow-400 fill-yellow-400" />
                                                                                                                                                            <span className="font-medium">{product.ratingsAverage}</span>
                                                                                                                                                            <span className="text-gray-500">({product.ratingsCount})</span>
                                                                                                                                                </div>
                                                                                                                                                <div className={`px-2 py-1 rounded ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} text-xs font-medium`}>
                                                                                                                                                            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                                                                                                                                                </div>
                                                                                                                                    </div>

                                                                                                                                    <div className="flex items-center gap-2">
                                                                                                                                                <button
                                                                                                                                                            onClick={() => { handleEditProduct(product), setProductId(product._id) }}
                                                                                                                                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                                                                                                                                                >
                                                                                                                                                            <Edit2 size={16} />
                                                                                                                                                            Edit
                                                                                                                                                </button>
                                                                                                                                                <button
                                                                                                                                                            onClick={() => deleteProductMutation.mutate(product._id)}
                                                                                                                                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
                                                                                                                                                >
                                                                                                                                                            <Trash2 size={16} />
                                                                                                                                                            Delete
                                                                                                                                                </button>
                                                                                                                                    </div>
                                                                                                                        </div>
                                                                                                            </div>
                                                                                                ))}
                                                            </div>

                                                            {data?.length === 0 && (
                                                                        <div className="text-center py-12">
                                                                                    <Package size={48} className="mx-auto text-gray-300 mb-4" />
                                                                                    <p className="text-gray-500 text-lg">No products found</p>
                                                                        </div>
                                                            )}
                                                </div>
                                    </main>

                                    {/* Add/Edit Product Modal */}
                                    {showProductModal && (
                                                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                                                            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                                                                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                                                                                    <h3 className="text-2xl font-bold text-gray-800">
                                                                                                {editingProduct ? 'Edit Product' : 'Add New Product'}
                                                                                    </h3>
                                                                                    <button
                                                                                                onClick={() => setShowProductModal(false)}
                                                                                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                                                    >
                                                                                                <X size={24} />
                                                                                    </button>
                                                                        </div>

                                                                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                                                                                    <div>
                                                                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Product Title</label>
                                                                                                <input
                                                                                                            type="text"
                                                                                                            required
                                                                                                            value={formData.title}
                                                                                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                                                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                                                            placeholder="Enter product title"
                                                                                                />
                                                                                    </div>

                                                                                    <div>
                                                                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                                                                                                <textarea
                                                                                                            required
                                                                                                            value={formData.description}
                                                                                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                                                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                                                                                                            placeholder="Enter product description"
                                                                                                />
                                                                                    </div>

                                                                                    <div className="grid grid-cols-2 gap-4">
                                                                                                <div>
                                                                                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Price ($)</label>
                                                                                                            <input
                                                                                                                        type="number"
                                                                                                                        required
                                                                                                                        step="0.01"
                                                                                                                        value={formData.price}
                                                                                                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                                                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                                                                        placeholder="0.00"
                                                                                                            />
                                                                                                </div>

                                                                                                <div>
                                                                                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Stock</label>
                                                                                                            <input
                                                                                                                        type="number"
                                                                                                                        required
                                                                                                                        value={formData.stock}
                                                                                                                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                                                                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                                                                        placeholder="0"
                                                                                                            />
                                                                                                </div>
                                                                                    </div>

                                                                                    {/* <div>
                                                                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                                                                                                <input
                                                                                                            type="text"
                                                                                                            required
                                                                                                            value={formData.category}
                                                                                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                                                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                                                            placeholder="e.g., Electronics, Accessories"
                                                                                                />
                                                                                    </div> */}

                                                                                    <div>
                                                                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                                                                            Product Image
                                                                                                </label>

                                                                                                <input
                                                                                                            type="file"
                                                                                                            accept="image/*"
                                                                                                            onChange={handleImageUpload}
                                                                                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg
               file:mr-4 file:py-2 file:px-4
               file:rounded-md file:border-0
               file:bg-blue-50 file:text-blue-700
               hover:file:bg-blue-100"
                                                                                                />

                                                                                                {formData.images[0] && (
                                                                                                            <img
                                                                                                                        src={formData.images[0]}
                                                                                                                        alt="Preview"
                                                                                                                        className="mt-3 h-32 rounded-lg object-cover"
                                                                                                            />
                                                                                                )}
                                                                                    </div>


                                                                                    <div className="flex items-center gap-3">
                                                                                                <input
                                                                                                            type="checkbox"
                                                                                                            id="featured"
                                                                                                            checked={formData.isFeatured}
                                                                                                            onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                                                                                                            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                                                                                />
                                                                                                <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                                                                                                            Mark as Featured Product
                                                                                                </label>
                                                                                    </div>

                                                                                    <div className="flex gap-3 pt-4">
                                                                                                <button
                                                                                                            type="button"
                                                                                                            onClick={() => setShowProductModal(false)}
                                                                                                            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                                                                                >
                                                                                                            Cancel
                                                                                                </button>

                                                                                                {
                                                                                                            editingProduct ? <button
                                                                                                                        type='button'
                                                                                                                        onClick={editProduct}
                                                                                                                        className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                                                                                            >
                                                                                                                        Update Product
                                                                                                            </button> : <button
                                                                                                                        type="submit"
                                                                                                                        className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                                                                                            >
                                                                                                                        Add Product
                                                                                                            </button>
                                                                                                }
                                                                                    </div>
                                                                        </form>
                                                            </div>
                                                </div>
                                    )}
                        </div>
            );
}