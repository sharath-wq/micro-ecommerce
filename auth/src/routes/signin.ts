import express from 'express';
import { body } from 'express-validator';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { Password } from '../services/password';
import { User } from '../model/user';
import { BadRequestError, validateRequest } from '@scmicroecom/common';

const router = express.Router();

router.post(
    '/api/users/signin',
    [
        body('email').isEmail().withMessage('Email must be valid'),
        body('password').trim().notEmpty().withMessage('Password is required'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            throw new BadRequestError('Invalid Credentials');
        }

        const passwordMatch = await Password.compare(existingUser.password, password);

        if (!passwordMatch) {
            throw new BadRequestError('Invalid Credentials');
        }

        const userJwt = jwt.sign(
            {
                id: existingUser._id,
                email: existingUser.email,
            },
            process.env.JWT_KEY!
        );

        req.session = {
            jwt: userJwt,
        };

        res.status(200).send(existingUser);
    }
);

export { router as singinRouter };
