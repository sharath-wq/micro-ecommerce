import { Listener, Subjects, AddToCartEvent } from '@scmicroecom/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Cart } from '../../models/cart';

export class AddedToCartListener extends Listener<AddToCartEvent> {
    subject: Subjects.AddToCart = Subjects.AddToCart;
    queueGroupName: string = queueGroupName;

    async onMessage(data: AddToCartEvent['data'], msg: Message) {
        const cart = await Cart.findById(data.id);

        if (!cart) {
            throw new Error('Not Found');
        }

        cart.products.push({
            id: data.product.id,
            price: data.product.price,
            title: data.product.title,
        });

        await cart.save();
        msg.ack();
    }
}
