import express, { Request, Response } from 'express';
import { Cart } from '../models/cart';
import { NotFoundError } from '@scmicroecom/common';
const router = express.Router();

router.post('/api/cart/add', async (req: Request, res: Response) => {
    const cart = await Cart.findOne({
        userId: req.currentUser?.id,
    });

    const { productId } = req.body;

    if (!cart) {
        throw new NotFoundError();
    }

    cart.products.push(productId);

    await cart.save();

    res.send(cart);
});

export { router as addCartRouter };
