import * as dotenv from 'dotenv';
dotenv.config();

export const RABBIT_MQ_SERVER = process.env.RABBIT_MQ_SERVER;

export const EAR_LIQUIDATOR_WORKER_NAME =
  process.env.EAR_LIQUIDATOR_WORKER_NAME;

export const ERROR_RABBIT_MQ_QUEUE_EAR_LIQUIDATION =
  process.env.ERROR_RABBIT_MQ_QUEUE_EAR_LIQUIDATION;

export const RABBIT_MQ_QUEUE_EAR_LIQUIDATION_FAILED =
  process.env.RABBIT_MQ_QUEUE_EAR_LIQUIDATION_FAILED;

export const RABBIT_MQ_QUEUE_EAR_LIQUIDATION =
  process.env.RABBIT_MQ_QUEUE_EAR_LIQUIDATION;

export const RABBIT_MQ_MAX_RECONECTION_ATTEMPTS = Number(
  process.env.RABBIT_MQ_MAX_RECONECTION_ATTEMPTS,
);
export const RABBIT_MQ_RECONECTION_RETRY_DELAY = Number(
  process.env.RABBIT_MQ_RECONECTION_RETRY_DELAY,
);

/* EMAIL_TO_LIQUIDATED_FIXED_RATE_CDT_WORKER_QUEUE =
  process.env.EMAIL_TO_LIQUIDATED_FIXED_RATE_CDT_WORKER_QUEUE; */

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
