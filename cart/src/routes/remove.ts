import express, { Request, Response } from 'express';
import { Cart } from '../models/cart';
import { NotFoundError, requireAuth, validateRequest } from '@scmicroecom/common';
import { Product } from '../models/product';
import { RemovedFromCartPublisher } from '../events/publisher/removed-from-cart-publisher';
import { natsWrapper } from '../nats-wrapper';
import { body } from 'express-validator';
const router = express.Router();

router.post(
    '/api/cart/remove',
    requireAuth,
    [body('productId').not().isEmpty().withMessage('Product id is needed')],
    validateRequest,
    async (req: Request, res: Response) => {
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

        const product = await Product.findById(productId);

        if (!product) {
            throw new NotFoundError();
        }

        await new RemovedFromCartPublisher(natsWrapper.client).publish({
            id: cart.id,
            userId: req.currentUser!.id,
            product: {
                id: product.id,
                price: product.price,
                title: product.title,
            },
        });

        res.send(cart);
    }
);

export { router as removeCartRouter };
