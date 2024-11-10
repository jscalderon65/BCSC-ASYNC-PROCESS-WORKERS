import * as dotenv from 'dotenv';
dotenv.config();
export const EAR_LIQUIDATOR_WORKER_NAME =
  process.env.EAR_LIQUIDATOR_WORKER_NAME;
export const EAR_VALUE = parseFloat(process.env.EAR_VALUE);
/* MAILJET_API_KEY = process.env.MAILJET_API_KEY;
MAILJET_API_SECRET = process.env.MAILJET_API_SECRET;
SENDER_MAILJET_EMAIL = process.env.SENDER_MAILJET_EMAIL;
 */
