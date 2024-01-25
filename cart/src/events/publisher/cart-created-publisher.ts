import { Publisher, Subjects, CartCreatedEvent } from '@scmicroecom/common';

export class CartCreatedPublisher extends Publisher<CartCreatedEvent> {
    subject: Subjects.CartCreated = Subjects.CartCreated;
}
