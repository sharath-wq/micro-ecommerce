import { Publisher, OrderCreatedEvent, Subjects } from '@scmicroecom/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
