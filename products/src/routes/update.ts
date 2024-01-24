import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest, NotFoundError, requireAuth, NotAuthorizedError, BadRequestError } from '@scmicroecom/common';
import { Product } from '../models/product';

const router = express.Router();

router.put(
    '/api/products/:id',
    requireAuth,
    [
        body('title').not().isEmpty().withMessage('Title is required'),
        body('price').isFloat({ gt: 0 }).withMessage('price must be greater than 0'),
        body('description').not().isEmpty().withMessage('Description is required'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const product = await Product.findById(req.params.id);

        if (!product) {
            throw new NotFoundError();
        }

        // if (product.orderId) {
        //     throw new BadRequestError('Cannot edit a reserved ticket');
        // }

        if (product.userId !== req.currentUser!.id) {
            throw new NotAuthorizedError();
        }

        product.set({
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            image: req.body.image,
        });

        await product.save();

        // Impliment ticket updated publisher
        // new TicketUpdatedPublisher(natsWrapper.client).publish({
        //     id: ticket.id,
        //     version: ticket.version,
        //     title: ticket.title,
        //     price: ticket.price,
        //     userId: ticket.userId,
        // });

        res.send(product);
    }
);

export { router as updateProductRouter };
