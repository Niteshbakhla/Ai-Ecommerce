import { Request, Response, NextFunction } from "express";
import {
            getOverviewStats,
            getMonthlySalesStats,
            getTopSellingProducts,
            getLowStockProducts,
            getTopCustomers,
} from "../services/adminAnalyticsService";

export const overviewController = async (req: Request, res: Response, next: NextFunction) => {
            try {
                        res.status(200).json(await getOverviewStats());
            } catch (err) {
                        next(err);
            }
};

export const salesController = async (req: Request, res: Response, next: NextFunction) => {
            try {
                        res.status(200).json(await getMonthlySalesStats());
            } catch (err) {
                        next(err);
            }
};

export const topProductsController = async (req: Request, res: Response, next: NextFunction) => {
            try {
                        res.status(200).json(await getTopSellingProducts());
            } catch (err) {
                        next(err);
            }
};

export const lowStockController = async (req: Request, res: Response, next: NextFunction) => {
            try {
                        const threshold = req.query.threshold ? Number(req.query.threshold) : 5;
                        res.status(200).json(await getLowStockProducts(threshold));
            } catch (err) {
                        next(err);
            }
};

export const topCustomersController = async (req: Request, res: Response, next: NextFunction) => {
            try {
                        res.status(200).json(await getTopCustomers());
            } catch (err) {
                        next(err);
            }
};
