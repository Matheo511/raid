import { Command } from './KING-NUKE';
import { Message } from 'discord.js';

export default {
    name: "ban-all",
    description: "Commande désactivée dans cette version (safe stub)",
    run: async (client, kmsg: Message, args, kingman) => {
        if (!kmsg.guild) return;
        await kmsg.channel.send("La commande 'ban-all' est désactivée dans cette version.");
        console.log(`[SAFE-STUB] ban-all appelé par ${kmsg.author.id} dans ${kmsg.guild.id}`);
    }
} as Command;
