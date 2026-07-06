import { readdirSync, existsSync } from 'fs';
import { KINGMAN_Client } from '../Client';
import { Command } from '../KING-NUKE';

export default (client: KINGMAN_Client) => {
  const commandsDir = './Commands';
  if (!existsSync(commandsDir)) {
    console.error('Commands directory not found:', commandsDir);
    return;
  }
  readdirSync(commandsDir).forEach(folder => {
    const files = readdirSync(`${commandsDir}/${folder}`).filter(f => f.endsWith('.ts') || f.endsWith('.js'));
    for (const f of files) {
      try {
        const cmd = require(`${commandsDir}/${folder}/${f}`).default as Command;
        if (cmd && cmd.name) client.commands.set(cmd.name, cmd);
      } catch (err) {
        console.error(`Failed to load command ${folder}/${f}:`, err);
      }
    }
  });
};
