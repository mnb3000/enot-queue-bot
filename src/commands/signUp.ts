import { Message } from 'node-telegram-bot-api';
import { ReplyData } from 'node-telegram-operation-manager';
import apolloClient from '../apolloClient';
import {
  AddStudentMutation, AddStudentMutationVariables,
} from '../generated/graphql';
import bot from '../bot';
import strings from '../strings';
import replyManager from '../replyManager';
import AddStudentMutationGQL from '../graphql/mutations/addStudent.graphql';
import sendMenu from './sendMenu';
import { getStudentById } from '../utils';

export default async (msg: Message) => {
  if (!msg.from || msg.chat.type !== 'private') return;
  const userId = msg.from.id;
  const student = await getStudentById(userId);
  if (!student) {
    await bot.sendMessage(msg.chat.id, strings.startNewUserString, { parse_mode: 'Markdown' });
    if (replyManager.expects(userId)) return;
    replyManager.register(userId, async (someData?: ReplyData) => {
      if (!someData || !msg.from) return;
      await apolloClient.mutate<AddStudentMutation, AddStudentMutationVariables>({
        mutation: AddStudentMutationGQL,
        variables: {
          tgId: userId,
          name: someData.text,
        },
      });
      await sendMenu(userId);
    });
  } else {
    await sendMenu(userId);
  }
};
