import { Publisher, Subjects, ProductCreatedEvent } from '@scmicroecom/common';

export class ProductCreatedPublisher extends Publisher<ProductCreatedEvent> {
    subject: Subjects.ProductCreated = Subjects.ProductCreated;
}
