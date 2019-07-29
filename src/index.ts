import 'cross-fetch/polyfill';
import { hasEntity } from './utils';
import bot from './bot';
import replyManager from './replyManager';

import signUp from './commands/signUp';
import subNotifyPlace, { subNotifyPassed } from './commands/subNotify';

const notifyPlaces = [
  2, 3,
];

async function main() {
  bot.onText(/\/start/, signUp);
  bot.on('message', async msg => {
    if (!msg.from) return;
    if (!hasEntity('bot_command', msg.entities)) {
      if (replyManager.expects(msg.from.id)) {
        const { text, entities } = msg;
        replyManager.execute(msg.from.id, { text, entities });
      } else {
        await signUp(msg);
      }
    }
  });
  notifyPlaces.forEach(place => subNotifyPlace(place));
  subNotifyPassed();
}

main()
  .catch(e => console.error(e));
