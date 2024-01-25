import { Listener, Subjects, OrderCreatedEvent } from '@scmicroecom/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Cart } from '../../models/cart';

export class OrderCreatedEventListener extends Listener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName: string = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        const cart = await Cart.findById(data.cartId);

        if (!cart) {
            throw new Error('Not Found');
        }

        cart.products = [];
        await cart.save();

        msg.ack();
    }
}
