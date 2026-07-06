import { Command } from './KING-NUKE';
import { Message } from 'discord.js';

export default {
  name: "clear-channels",
  description: "Commande désactivée dans cette version (safe stub)",
  run: async (client, kmsg: Message) => {
    if (!kmsg.guild) return;
    await kmsg.channel.send("La commande 'clear-channels' est désactivée dans cette version.");
    console.log(`[SAFE-STUB] clear-channels appelé par ${kmsg.author.id} dans ${kmsg.guild.id}`);
  }
} as Command;
