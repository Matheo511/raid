import { Client, ClientOptions, Collection } from "discord.js";
import { Command, ConfigData } from './types/KING-NUKE';
import Config from "./Config";

export class KINGMAN_Client extends Client {
    public commands: Collection<string, Command>;
    public config: ConfigData;

    constructor(clientOptions: ClientOptions) {
        super(clientOptions);
        this.commands = new Collection();
        this.config = Config;
        this.loadHandlers();
    }

    private async loadHandlers(): Promise<void> {
        try {
            const handlers = ['command', 'events'];
            for (const handler of handlers) {
                try {
                    const module = await import(`./handler/${handler}`);
                    module.default(this);
                } catch (error) {
                    console.error(`Failed to load handler: ${handler}`, error);
                }
            }
        } catch (error) {
            console.error('Error loading handlers:', error);
        }
    }
}
