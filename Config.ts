import dotenv from 'dotenv';
dotenv.config();
import * as CONFIG from './config.json';
import { ConfigData } from './KING-NUKE';

const token = process.env['TOKEN'] ?? process.env['token'] ?? CONFIG.basic.token;
const prefix = process.env['PREFIX'] ?? process.env['prefix'] ?? CONFIG.basic.prefix;

export default {
    token,
    prefix,
    devs: CONFIG.WhiteListe
} as ConfigData;
