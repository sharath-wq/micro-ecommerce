import { Listener, Subjects, ProductUpdatedEvent } from '@scmicroecom/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Product } from '../../models/product';

export class ProductUpdatedListener extends Listener<ProductUpdatedEvent> {
    subject: Subjects.ProductUpdated = Subjects.ProductUpdated;
    queueGroupName: string = queueGroupName;

    async onMessage(data: ProductUpdatedEvent['data'], msg: Message) {
        const product = await Product.findByEvent(data);

        if (!product) {
            throw new Error('Product not found');
        }

        product.set({
            title: data.title,
            price: data.price,
            image: data.image,
        });

        await product.save();

        msg.ack();
    }
}
