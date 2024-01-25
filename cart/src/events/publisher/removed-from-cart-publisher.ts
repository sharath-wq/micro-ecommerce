import { Publisher, Subjects, RemoveFromCart } from '@scmicroecom/common';

export class RemovedFromCartPublisher extends Publisher<RemoveFromCart> {
    subject: Subjects.RemoveFromCart = Subjects.RemoveFromCart;
}
