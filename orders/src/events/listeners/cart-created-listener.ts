import { Listener, Subjects, CartCreatedEvent } from '@scmicroecom/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Cart } from '../../models/cart';

export class CartCreatedListener extends Listener<CartCreatedEvent> {
    subject: Subjects.CartCreated = Subjects.CartCreated;
    queueGroupName: string = queueGroupName;

    async onMessage(data: CartCreatedEvent['data'], msg: Message) {
        const cart = Cart.build({
            id: data.id,
            userId: data.userId,
            products: [],
        });

        await cart.save();

        msg.ack();
    }
}
