import express, { Request, Response } from 'express';
import { Cart } from '../models/cart';
import { BadRequestError, NotFoundError } from '@scmicroecom/common';
import { AddedToCartPublisher } from '../events/publisher/added-to-cart-publisher';
import { natsWrapper } from '../nats-wrapper';
import { Product } from '../models/product';
const router = express.Router();

router.post('/api/cart/add', async (req: Request, res: Response) => {
    const cart = await Cart.findOne({
        userId: req.currentUser?.id,
    });

    const { productId } = req.body;

    if (!cart) {
        throw new NotFoundError();
    }

    if (cart.products.includes(productId)) {
        throw new BadRequestError('Product already in the cart');
    }

    cart.products.push(productId);

    await cart.save();

    const product = await Product.findById(productId);

    if (!product) {
        throw new NotFoundError();
    }

    await new AddedToCartPublisher(natsWrapper.client).publish({
        id: cart.id,
        userId: cart.userId,
        product: {
            id: product.id,
            price: product.price,
            title: product.title,
        },
    });

    res.send(cart);
});

export { router as addCartRouter };
