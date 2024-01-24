import { Listener, Subjects, UserCreatedEvent } from '@scmicroecom/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Cart } from '../../models/cart';
import { CartCreatedPublisher } from '../publisher/cart-created-publisher';
import { natsWrapper } from '../../nats-wrapper';

export class UserCreatedListener extends Listener<UserCreatedEvent> {
    subject: Subjects.UserCreated = Subjects.UserCreated;
    queueGroupName: string = queueGroupName;

    async onMessage(data: UserCreatedEvent['data'], msg: Message) {
        const cart = Cart.build({
            userId: data.id,
            items: [],
        });

        await cart.save();

        await new CartCreatedPublisher(natsWrapper.client).publish({
            id: cart.id,
            userId: cart.userId,
        });

        msg.ack();
    }
}
