import Order from "../models/order.model";
import Product from "../models/product.model";
import User from "../models/user.model"



export const getOverviewStats = async () => {
            const [revenue, totalOrders, totalCustomers] = await Promise.all([
                        Order.aggregate([
                                    { $match: { paymentStatus: "paid" } },
                                    { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } },
                        ]),
                        Order.countDocuments({ paymentStatus: "paid" }),
                        User.countDocuments({ role: "user" }),
            ]);

            return {
                        totalRevenue: revenue[0]?.totalRevenue || 0,
                        totalOrders,
                        totalCustomers,
            };
};


export const getMonthlySalesStats = async () => {
            return Order.aggregate([
                        { $match: { paymentStatus: "paid" } },
                        {
                                    $group: {
                                                _id: { $month: "$createdAt" },
                                                totalSales: { $sum: "$totalAmount" },
                                                orderCount: { $sum: 1 },
                                    },
                        },
                        { $sort: { _id: 1 } },
            ]);
};


export const getTopSellingProducts = async () => {
            return Order.aggregate([
                        { $match: { paymentStatus: "paid" } },
                        { $unwind: "$products" },
                        {
                                    $group: {
                                                _id: "$products.productId",
                                                totalQuantity: { $sum: "$products.quantity" },
                                                totalRevenue: {
                                                            $sum: { $multiply: ["$products.quantity", "$products.priceAtPurchase"] },
                                                },
                                    },
                        },
                        { $sort: { totalQuantity: -1 } },
                        { $limit: 10 },
                        {
                                    $lookup: {
                                                from: "products",
                                                localField: "_id",
                                                foreignField: "_id",
                                                as: "product",
                                    },
                        },
                        { $unwind: "$product" },
            ]);
};


export const getLowStockProducts = async (threshold: number = 5) => {
            return Product.find({ stock: { $lt: threshold } })
                        .sort({ stock: 1 })
                        .select("title stock");
};


export const getTopCustomers = async () => {
            return Order.aggregate([
                        { $match: { paymentStatus: "paid" } },
                        {
                                    $group: {
                                                _id: "$userId",
                                                totalSpent: { $sum: "$totalAmount" },
                                                orderCount: { $sum: 1 },
                                    },
                        },
                        { $sort: { totalSpent: -1 } },
                        { $limit: 10 },
                        {
                                    $lookup: {
                                                from: "users",
                                                localField: "_id",
                                                foreignField: "_id",
                                                as: "user",
                                    },
                        },
                        { $unwind: "$user" },
                        { $project: { totalSpent: 1, orderCount: 1, "user.name": 1, "user.email": 1 } },
            ]);
};