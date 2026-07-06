import { readdirSync, existsSync } from 'fs';
import { KINGMAN_Client } from '../Client';
import { Events } from '../KING-NUKE';

export default (client: KINGMAN_Client) => {
  const eventsDir = './Events';
  if (!existsSync(eventsDir)) {
    console.error('Events directory not found:', eventsDir);
    return;
  }
  readdirSync(eventsDir).forEach(folder => {
    const files = readdirSync(`${eventsDir}/${folder}`).filter(f => f.endsWith('.ts') || f.endsWith('.js'));
    for (const f of files) {
      try {
        const ev = require(`${eventsDir}/${folder}/${f}`).default as Events;
        if (ev && ev.name) client.on(ev.name, (...args: any[]) => ev.run(client, ...args));
      } catch (err) {
        console.error(`Failed to load event ${folder}/${f}:`, err);
      }
    }
  });
};
