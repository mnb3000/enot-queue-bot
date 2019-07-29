import { QueueQuery, Student } from './generated/graphql';

export default {
  startNewUserString: '*Привет новый пользователь!*\n'
    + 'Введи ФИО:',
  startOldUserString: '*Привет старый пользователь!*',
  menu: 'Меню',
  allQueues: 'Выбери очередь:',
  myQueues: 'Твои очереди:',
  queueNotFound: 'Очередь не найдена, попробуйте еще раз',
  queueInfo: (
    queue: NonNullable<QueueQuery['queue']>,
    student: Pick<Student, 'queuePlaces' | 'id'>,
  ) => {
    const queueNames = student.queuePlaces.map(queuePlace => queuePlace.queueName);
    const queueIndex = queueNames.indexOf(queue.name);
    const queuePlaces = student.queuePlaces[queueIndex];
    return `*Очередь:* ${queue.name}
*Количество человек:* ${queue.students.length}
${queueNames.includes(queue.name) && queueIndex !== -1
    ? `Ваша позиция в очереди: *${queuePlaces.place}*
Ваш уникальный номер в очереди *${queuePlaces.uniqueId}*`
    : ''}`;
  },
  queueKeyboard: {
    join: 'Встать в очередь',
    leave: 'Выйти из очереди',
    back: 'Назад',
  },
  menuKeyboard: {
    allQueues: 'Все очереди',
    myQueues: 'Мои очереди',
  },
  back: 'Назад',
  error: 'Что-то пошло не так',
  joinedQueue: (queueName: string, place: number, uniqueId: number) => `Вы успешно присоединились к очереди *${queueName}*!
Ваша позиция в очереди: *${place}*
Ваш уникальный номер в очереди *${uniqueId}*`,
  leftQueue: (queueName: string) => `Вы успешно покинули очередь *${queueName}*`,
  queueNotification: (queueName: string, place: number) => `Поторопись! Ты уже под номером *${place}* в очереди *${queueName}*`,
  queuePassedNotification: (queueName: string, passed: boolean) => (passed
    ? `Сейчас *твоя очередь* в очереди *${queueName}*`
    : `Ты был *отклонен* в очереди *${queueName}* :(`),
};
