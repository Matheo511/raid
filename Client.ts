import { Client, ClientOptions, Collection } from "discord.js";
import { Command, ConfigData } from './KING-NUKE';
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
        const handlers = ['command', 'events'];
        for (const handler of handlers) {
            // try handler/<name>, fallback to ./<name>
            const candidatePaths = [
                `./handler/${handler}`,
                `./${handler}`
            ];
            let loaded = false;
            for (const path of candidatePaths) {
                try {
                    const module = await import(path);
                    if (module && typeof module.default === 'function') {
                        module.default(this);
                    } else if (module && module.init && typeof module.init === 'function') {
                        // alternative export styles
                        module.init(this);
                    }
                    loaded = true;
                    break;
                } catch (err) {
                    // continue to next candidate
                }
            }
            if (!loaded) {
                console.error(`Handler not found: ${handler} (tried ${candidatePaths.join(', ')})`);
            }
        }
    }
}
