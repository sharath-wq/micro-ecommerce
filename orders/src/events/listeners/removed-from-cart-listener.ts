import { Listener, Subjects, RemoveFromCartEvent } from '@scmicroecom/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Cart } from '../../models/cart';

export class RemovedFromCartListener extends Listener<RemoveFromCartEvent> {
    subject: Subjects.RemoveFromCart = Subjects.RemoveFromCart;
    queueGroupName: string = queueGroupName;

    async onMessage(data: RemoveFromCartEvent['data'], msg: Message) {
        const cart = await Cart.findById(data.id);

        if (!cart) {
            throw new Error('Not Found');
        }

        cart.products = cart.products.filter((item) => item.id !== data.product.id);

        await cart.save();

        msg.ack();
    }
}
