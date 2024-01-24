import { requireAuth, validateRequest } from '@scmicroecom/common';
import { body } from 'express-validator';
import express, { Request, Response } from 'express';
import { Product } from '../models/product';

const router = express.Router();

router.post(
    '/api/products',
    requireAuth,
    [
        body('title').not().isEmpty().withMessage('Title is required'),
        body('price').isFloat({ gt: 0 }).withMessage('price must be greater than 0'),
        body('description').not().isEmpty().withMessage('Description is required'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { title, description, image, price } = req.body;

        const product = Product.build({
            title,
            description,
            image,
            price,
            userId: req.currentUser!.id,
        });
        await product.save();

        // Add ticket created publisher

        res.status(201).send(product);
    }
);

export { router as productCreatedRouter };
