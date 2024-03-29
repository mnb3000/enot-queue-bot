import apolloClient from '../apolloClient';
import PlaceNotifySubscriptionGQL from '../graphql/subscriptions/notifyStudentPlace.graphql';
import PassedNotifySubscriptionGQL from '../graphql/subscriptions/notifyStudentPassed.graphql';
import {
  PassedNotifySubscription, PassedNotifySubscriptionVariables,
  PlaceNotifySubscription,
  PlaceNotifySubscriptionVariables,
} from '../generated/graphql';
import bot from '../bot';
import strings from '../strings';

export default function subNotifyPlace(place: number) {
  const notifySub = apolloClient.subscribe<
  PlaceNotifySubscription,
  PlaceNotifySubscriptionVariables
  >({
    query: PlaceNotifySubscriptionGQL,
    variables: {
      place,
    },
  });
  notifySub.subscribe(async subResult => {
    if (!subResult.data) return;
    const { notifyStudentPlace } = subResult.data;
    const { queueName, student } = notifyStudentPlace;
    await bot.sendMessage(student.tgId, strings.queueNotification(queueName, place), { parse_mode: 'Markdown' });
  });
}

export function subNotifyPassed() {
  const notifySub = apolloClient.subscribe<
  PassedNotifySubscription,
  PassedNotifySubscriptionVariables
  >({
    query: PassedNotifySubscriptionGQL,
  });
  notifySub.subscribe(async subResult => {
    if (!subResult.data) return;
    const { notifyStudentPassed } = subResult.data;
    const { queueName, student, passed } = notifyStudentPassed;
    await bot.sendMessage(student.tgId, strings.queuePassedNotification(queueName, passed), { parse_mode: 'Markdown' });
  });
}
