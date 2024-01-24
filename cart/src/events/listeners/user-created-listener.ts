import { Listener, Subjects, UserCreatedEvent } from '@scmicroecom/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Cart } from '../../models/cart';

export class UserCreatedListener extends Listener<UserCreatedEvent> {
    subject: Subjects.UserCreated = Subjects.UserCreated;
    queueGroupName: string = queueGroupName;

    async onMessage(data: UserCreatedEvent['data'], msg: Message) {
        const cart = Cart.build({
            userId: data.id,
            items: [],
        });

        await cart.save();

        msg.ack();
    }
}
