import { KINGMAN_Client } from './Client';
import Config from './Config';

const client = new KINGMAN_Client({
    intents: 32767,
});

client.login(Config.token).catch((error: Error) => {
    console.error('Failed to log in to Discord:', error);
    process.exit(1);
});
