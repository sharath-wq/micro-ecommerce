import { Publisher, Subjects, RemoveFromCartEvent } from '@scmicroecom/common';

export class RemovedFromCartPublisher extends Publisher<RemoveFromCartEvent> {
    subject: Subjects.RemoveFromCart = Subjects.RemoveFromCart;
}
