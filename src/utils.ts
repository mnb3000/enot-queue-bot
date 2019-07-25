import { KeyboardButton, MessageEntity } from 'node-telegram-bot-api';
import { ReplyKeyboard } from 'node-telegram-keyboard-wrapper-fix';
import { Queue, StudentQuery, StudentQueryVariables } from './generated/graphql';
import strings from './strings';
import apolloClient from './apolloClient';
import StudentQueryGQL from './graphql/queries/student.graphql';

export function hasEntity(entity: string, entities?: MessageEntity[]) {
  if (!entities || !entities.length) {
    return false;
  }
  return entities.some(e => e.type === entity);
}

export function generate2x2QueueKeyboard(queues: Pick<Queue, 'name'>[]) {
  const keyboard = new ReplyKeyboard();
  for (let i = 0; i < Math.ceil(queues.length / 2); i += 2) {
    const buttons: KeyboardButton[] = [];
    for (let j = 0; j < 2; j += 1) {
      const queue = queues[(i * 2) + j];
      if (queue) {
        buttons.push({ text: queue.name });
      }
    }
    keyboard.addRow(...buttons);
  }
  keyboard.addRow({ text: strings.back });
  return keyboard;
}

export async function getStudentById(userId: number) {
  const studentQueryResult = await apolloClient.query<StudentQuery, StudentQueryVariables>({
    query: StudentQueryGQL,
    variables: {
      tgId: userId,
    },
  });
  const { student } = studentQueryResult.data;
  return student;
}
