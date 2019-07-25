import { ReplyData } from 'node-telegram-operation-manager';
import replyManager from '../replyManager';
import apolloClient from '../apolloClient';
import QueueQueryGQL from '../graphql/queries/queue.graphql';
import { QueueQuery, QueueQueryVariables } from '../generated/graphql';
import bot from '../bot';
import strings from '../strings';
import sendMenu from './sendMenu';
import sendQueue from './sendQueue';

export default function registerQueueSelection(userId: number) {
  replyManager.register(userId, async (someData?: ReplyData) => {
    if (!someData || !someData.text || someData.text === strings.back) {
      await sendMenu(userId);
      return;
    }
    const queueQueryResults = await apolloClient.query<QueueQuery, QueueQueryVariables>({
      query: QueueQueryGQL,
      variables: {
        name: someData.text,
      },
    });
    const { queue } = queueQueryResults.data;
    if (queue) {
      await sendQueue(userId, queue);
    } else {
      await bot.sendMessage(userId, strings.queueNotFound);
      await sendMenu(userId);
    }
  });
}
