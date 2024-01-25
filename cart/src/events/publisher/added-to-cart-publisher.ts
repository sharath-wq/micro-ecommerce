import { Publisher, Subjects, AddToCart } from '@scmicroecom/common';

export class AddedToCartPublisher extends Publisher<AddToCart> {
    subject: Subjects.AddToCart = Subjects.AddToCart;
}
