import { ReplyKeyboard } from 'node-telegram-keyboard-wrapper-fix';
import strings from './strings';

export default {
  queueKeyboard: (isJoined: boolean) => {
    const queueKeyboard = new ReplyKeyboard();
    if (!isJoined) {
      queueKeyboard.addRow({ text: strings.queueKeyboard.join });
    } else {
      queueKeyboard.addRow({ text: strings.queueKeyboard.leave });
    }
    queueKeyboard.addRow({ text: strings.queueKeyboard.back });
    return queueKeyboard.open({ resize_keyboard: true });
  },
  menuKeyboard: () => {
    const menuKeyboard = new ReplyKeyboard();
    return menuKeyboard
      .addRow({ text: strings.menuKeyboard.allQueues })
      .addRow({ text: strings.menuKeyboard.myQueues })
      .open({ resize_keyboard: true });
  },
};
