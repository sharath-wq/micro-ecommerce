import { Publisher, Subjects, AddToCartEvent } from '@scmicroecom/common';

export class AddedToCartPublisher extends Publisher<AddToCartEvent> {
    subject: Subjects.AddToCart = Subjects.AddToCart;
}
