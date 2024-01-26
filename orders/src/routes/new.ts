import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import { NotFoundError, OrderStatus, requireAuth, validateRequest } from '@scmicroecom/common';
import { body } from 'express-validator';
import { Cart } from '../models/cart';
import { Order } from '../models/order';
import { OrderCreatedPublisher } from '../events/publishers/order-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post(
    '/api/orders',
    requireAuth,
    [
        body('cartId')
            .not()
            .isEmpty()
            .custom((input) => mongoose.Types.ObjectId.isValid(input))
            .withMessage('Cart id must be provided'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { cartId } = req.body;

        const cart = await Cart.findById(cartId);

        if (!cart) {
            throw new NotFoundError();
        }

        const amount = cart.products.reduce((sum, item) => sum + item.price, 0);

        const order = Order.build({
            userId: cart.userId,
            products: cart.products,
            status: OrderStatus.Created,
            amount: amount,
        });

        await order.save();

        cart.products = [];
        await cart.save();

        // Order Created Publisher
        new OrderCreatedPublisher(natsWrapper.client).publish({
            id: order.id,
            status: OrderStatus.Created,
            userId: order.userId,
            cartId: cartId,
            amount: amount,
        });

        res.status(201).send(order);
    }
);

export { router as newOrderRouter };
