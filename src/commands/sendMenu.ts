import apolloClient from '../apolloClient';
import {
  QueuesQuery, QueuesQueryVariables,
} from '../generated/graphql';
import QueuesQueryGQL from '../graphql/queries/queues.graphql';
import bot from '../bot';
import replyManager from '../replyManager';
import strings from '../strings';
import registerQueueSelection from './registerQueueSelection';
import { generate2x2QueueKeyboard, getStudentById } from '../utils';
import keyboards from '../keyboards';

export default async function sendMenu(userId: number) {
  await bot.sendMessage(userId, strings.menu, keyboards.menuKeyboard());
  replyManager.register(userId, async someData => {
    if (!someData || !someData.text) return;
    const student = await getStudentById(userId);
    if (!student) return;
    const studentQueueNames = student.queuePlaces.map(queuePlace => queuePlace.queueName);
    if (someData.text === strings.menuKeyboard.allQueues) {
      const queuesQueryResult = await apolloClient.query<QueuesQuery, QueuesQueryVariables>({
        query: QueuesQueryGQL,
      });
      const { queues } = queuesQueryResult.data;
      const keyboard = generate2x2QueueKeyboard(
        queues.filter(queue => !studentQueueNames.includes(queue.name)),
      );
      await bot.sendMessage(userId, strings.allQueues, keyboard.open({
        resize_keyboard: true,
      }));
      if (replyManager.expects(userId)) return;
      await registerQueueSelection(userId);
    } else if (someData.text === strings.menuKeyboard.myQueues) {
      const keyboard = generate2x2QueueKeyboard(student.queuePlaces.map(queuePlace => ({
        name: queuePlace.queueName,
      })));
      await bot.sendMessage(userId, strings.myQueues, keyboard.open({
        resize_keyboard: true,
      }));
      if (replyManager.expects(userId)) return;
      await registerQueueSelection(userId);
    } else {
      await sendMenu(userId);
    }
  });
}
