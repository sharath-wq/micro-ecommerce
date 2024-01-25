import { Listener, Subjects, CartCreatedEvent } from '@scmicroecom/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { User } from '../../model/user';
import { UserUpdatedPubliser } from '../publisher/user-updated-publisher';
import { natsWrapper } from '../../../nats-wrapper';

export class CartCreatedListener extends Listener<CartCreatedEvent> {
    subject: Subjects.CartCreated = Subjects.CartCreated;
    queueGroupName: string = queueGroupName;

    async onMessage(data: CartCreatedEvent['data'], msg: Message) {
        const user = await User.findById(data.userId);

        if (!user) {
            throw new Error('Not found');
        }

        user.set({ cartId: data.id });
        await user.save();

        await new UserUpdatedPubliser(natsWrapper.client).publish({
            id: user.id,
            email: user.email,
            cartId: user.cartId!,
        });

        msg.ack();
    }
}
