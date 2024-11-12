import * as dotenv from 'dotenv';
dotenv.config();
export const TWO_FA_EMAIL_CONTROLLER_WORKER_NAME =
  process.env.TWO_FA_EMAIL_CONTROLLER_WORKER_NAME;

export const MAILJET_API_KEY = process.env.MAILJET_API_KEY;
export const MAILJET_API_SECRET = process.env.MAILJET_API_SECRET;
export const SENDER_MAILJET_EMAIL = process.env.SENDER_MAILJET_EMAIL;

export const EMAIL_SUBJECT =
  'Revisa tu código de autenticación para poder entrar al portal de Caja Plus';
