import { Publisher, Subjects, ProductUpdatedEvent } from '@scmicroecom/common';

export class ProductUpdatedPubliser extends Publisher<ProductUpdatedEvent> {
    subject: Subjects.ProductUpdated = Subjects.ProductUpdated;
}
