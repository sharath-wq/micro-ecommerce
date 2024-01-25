import express, { Request, Response } from 'express';
import { requireAuth } from '@scmicroecom/common';
import { Order } from '../models/order';

const router = express.Router();

router.get('/api/orders', requireAuth, async (req: Request, res: Response) => {
    const orders = await Order.find({
        userId: req.currentUser!.id,
    });

    const transformedOrders = orders.map((order) => ({
        _id: order.id,
        userId: order.userId,
        status: order.status,
        products: order.products.map((product) => ({
            title: product.title,
            price: product.price,
            _id: product.id,
        })),
        version: order.version,
    }));

    res.send(transformedOrders);
});

export { router as indexOrderRouter };
