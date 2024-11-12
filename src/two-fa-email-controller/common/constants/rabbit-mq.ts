import * as dotenv from 'dotenv';
dotenv.config();

export const RABBIT_MQ_SERVER = process.env.RABBIT_MQ_SERVER;

export const RABBIT_EMAIL_NOTIFICATION_QUEUE =
  process.env.RABBIT_EMAIL_NOTIFICATION_QUEUE;

export const ERROR_RABBIT_MQ_QUEUE_EMAIL_NOTIFICATION =
  process.env.ERROR_RABBIT_MQ_QUEUE_EMAIL_NOTIFICATION;

export const RABBIT_MQ_MAX_RECONECTION_ATTEMPTS = Number(
  process.env.RABBIT_MQ_MAX_RECONECTION_ATTEMPTS,
);
export const RABBIT_MQ_RECONECTION_RETRY_DELAY = Number(
  process.env.RABBIT_MQ_RECONECTION_RETRY_DELAY,
);

export const CONNECTION_SUCCESS_MESSAGE = 'Connection error to RabbitMQ';

export const CONNECTION_ERROR_MESSAGE = 'Connection error to RabbitMQ';

export const ON_CLOSE_CONNECTION_MESSAGE = 'Connection to RabbitMQ closed"';

export const FAILED_CHANNEL_CREATION_MESSAGE = 'Failed to create channel';

export const PROCESS_FAILED_MESSAGE = 'Process failed: ';
export const MAX_RETRIES_MESSAGE = 'Max retries reached, stopping worker';

export const RETRYING_MESSAGE = (seconds: number) =>
  `Retrying in ${seconds} seconds...`;

export const MESSAGE_SENT = (queueName: string) =>
  'Message sent to queue: [' + queueName + ']';

export const CONNECTION_ATTEMPT_MESSAGES = (
  attempt: number,
  errorMessage: string,
) => `Connection attempt ${attempt} failed: ${errorMessage}`;

export const CONNECTION_MESSAGE = (
  workerName: string,
  queueName: string,
): string =>
  'Worker [' + workerName + '] connected to: [' + queueName + '] queue';
