import express, { Request, Response } from 'express';
import { Cart } from '../models/cart';
import { requireAuth } from '@scmicroecom/common';
const router = express.Router();

router.get('/api/cart', requireAuth, async (req: Request, res: Response) => {
    const cart = await Cart.findOne({
        userId: req.currentUser?.id,
    }).populate({
        path: 'products',
        model: 'Product',
    });
    res.send(cart);
});

export { router as indexCartRouter };
