import { Listener, Subjects, ProductCreatedEvent } from '@scmicroecom/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Product } from '../../models/product';

export class ProductCreatedListener extends Listener<ProductCreatedEvent> {
    subject: Subjects.ProductCreated = Subjects.ProductCreated;
    queueGroupName: string = queueGroupName;

    async onMessage(data: ProductCreatedEvent['data'], msg: Message) {
        const product = Product.build({
            id: data.id,
            title: data.title,
            price: data.price,
            image: data.image,
            userId: data.userId,
        });

        await product.save();

        msg.ack();
    }
}
