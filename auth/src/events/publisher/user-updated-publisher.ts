import { Publisher, Subjects, UserUpdatedEvent } from '@scmicroecom/common';

export class UserUpdatedPubliser extends Publisher<UserUpdatedEvent> {
    subject: Subjects.UserUpdated = Subjects.UserUpdated;
}
