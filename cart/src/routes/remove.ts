import express, { Request, Response } from 'express';
import { Cart } from '../models/cart';
import { NotFoundError } from '@scmicroecom/common';
const router = express.Router();

router.post('/api/cart/remove', async (req: Request, res: Response) => {
    const cart = await Cart.findOne({
        userId: req.currentUser?.id,
    });

    const { productId } = req.body;

    if (!cart) {
        console.log('cart Not found');
        throw new NotFoundError();
    }

    cart.products = cart.products.filter((product) => product.toString() !== productId);

    await cart.save();

    res.send(cart);
});

export { router as removeCartRouter };
