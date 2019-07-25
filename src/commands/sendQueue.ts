import { ReplyData } from 'node-telegram-operation-manager';
import { find } from 'lodash';
import JoinQueueMutationGQL from '../graphql/mutations/joinQueue.graphql';
import LeaveQueueMutationGQL from '../graphql/mutations/leaveQueue.graphql';
import {
  JoinQueueMutation,
  JoinQueueMutationVariables,
  LeaveQueueMutation,
  LeaveQueueMutationVariables,
  QueueQuery,
} from '../generated/graphql';
import bot from '../bot';
import strings from '../strings';
import replyManager from '../replyManager';
import keyboards from '../keyboards';
import sendMenu from './sendMenu';
import apolloClient from '../apolloClient';
import { getStudentById } from '../utils';

export default async function sendQueue(userId: number, queue: QueueQuery['queue']) {
  if (!queue) return;
  const student = await getStudentById(userId);
  if (!student) return;
  const studentQueueNames = student.queuePlaces.map(queuePlace => queuePlace.queueName);
  await bot.sendMessage(userId, strings.queueInfo(queue, student), {
    ...keyboards.queueKeyboard(studentQueueNames.includes(queue.name)),
    parse_mode: 'Markdown',
  });
  replyManager.register(userId, async (someData?: ReplyData) => {
    if (!someData || !someData.text) return;
    if (someData.text === strings.queueKeyboard.join) {
      const joinMutationResult = await apolloClient.mutate<
      JoinQueueMutation,
      JoinQueueMutationVariables
      >({
        mutation: JoinQueueMutationGQL,
        variables: {
          queueName: queue.name,
          studentTgId: userId,
        },
      });
      if (joinMutationResult.data) {
        const updatedStudent = joinMutationResult.data.joinQueue;
        const queuePlace = find(updatedStudent.queuePlaces, {
          queueName: queue.name,
        });
        await bot.sendMessage(userId, strings.joinedQueue(queue.name, queuePlace!.place, queuePlace!.uniqueId), { parse_mode: 'Markdown' });
      } else {
        await bot.sendMessage(userId, strings.error);
      }
    } else if (someData.text === strings.queueKeyboard.leave) {
      const leaveMutationResult = await apolloClient.mutate<
      LeaveQueueMutation,
      LeaveQueueMutationVariables
      >({
        mutation: LeaveQueueMutationGQL,
        variables: {
          queueName: queue.name,
          studentTgId: userId,
        },
      });
      if (leaveMutationResult.data) {
        await bot.sendMessage(userId, strings.leftQueue(queue.name), { parse_mode: 'Markdown' });
      } else {
        await bot.sendMessage(userId, strings.error);
      }
    }
    await sendMenu(userId);
  });
}
