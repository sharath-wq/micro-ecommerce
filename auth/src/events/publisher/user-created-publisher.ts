import { Publisher, Subjects, UserCreatedEvent } from '@scmicroecom/common';

export class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
    subject: Subjects.UserCreated = Subjects.UserCreated;
}
