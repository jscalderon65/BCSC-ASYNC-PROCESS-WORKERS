import { EAR_LIQUIDATOR_WORKER_NAME } from '@ear-liquidator/common/constants/config-worker';
import {
  CONNECTION_ATTEMPT_MESSAGES,
  CONNECTION_ERROR_MESSAGE,
  CONNECTION_MESSAGE,
  ERROR_RABBIT_MQ_QUEUE_EAR_LIQUIDATION,
  FAILED_CHANNEL_CREATION_MESSAGE,
  MAX_RETRIES_MESSAGE,
  MESSAGE_SENT,
  ON_CLOSE_CONNECTION_MESSAGE,
  PROCESS_FAILED_MESSAGE,
  RABBIT_MQ_MAX_RECONECTION_ATTEMPTS,
  RABBIT_MQ_QUEUE_EAR_LIQUIDATION,
  RABBIT_MQ_RECONECTION_RETRY_DELAY,
  RABBIT_MQ_SERVER,
  RETRYING_MESSAGE,
} from '@ear-liquidator/common/constants/rabbit-mq';
import { calculateDailyLiquidationInterest } from '@ear-liquidator/operations';
import { Logger } from '@nestjs/common';
import * as amqp from 'amqplib';

export class EarLiquidatorWorker {
  private connection: amqp.Connection | null = null;
  private channel: amqp.Channel | null = null;
  private readonly maxRetries = RABBIT_MQ_MAX_RECONECTION_ATTEMPTS;
  private readonly retryDelay = RABBIT_MQ_RECONECTION_RETRY_DELAY;
  private readonly logger = new Logger(EAR_LIQUIDATOR_WORKER_NAME);

  constructor() {}

  private setupConnectionHandlers(): void {
    this.connection?.on('error', async (err) => {
      this.logger.error(CONNECTION_ERROR_MESSAGE, err);
      await this.connectWithRetry();
    });

    this.connection?.on('close', async () => {
      this.logger.log(ON_CLOSE_CONNECTION_MESSAGE);
      await this.connectWithRetry();
    });
  }

  private async connectWithRetry(): Promise<void> {
    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        this.connection = await amqp.connect(RABBIT_MQ_SERVER);
        this.channel = await this.connection.createChannel();
        this.setupConnectionHandlers();
        CONNECTION_MESSAGE(
          EAR_LIQUIDATOR_WORKER_NAME,
          RABBIT_MQ_QUEUE_EAR_LIQUIDATION,
        );
        return;
      } catch (error) {
        this.logger.error(CONNECTION_ATTEMPT_MESSAGES(attempt, error.message));

        if (attempt === this.maxRetries) {
          this.logger.error(MAX_RETRIES_MESSAGE);
          process.exit(1);
        }
        const seconds = this.retryDelay / 1000;
        this.logger.log(RETRYING_MESSAGE(seconds));
        await new Promise((resolve) => setTimeout(resolve, this.retryDelay));
      }
    }
  }

  async sendToQueue(queueName: string, message: any): Promise<void> {
    if (!this.channel) {
      await this.connectWithRetry();
    }
    await this.channel?.assertQueue(queueName, { durable: true });
    this.channel?.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
  }

  async startListening(): Promise<void> {
    await this.connectWithRetry();

    if (!this.channel) throw new Error(FAILED_CHANNEL_CREATION_MESSAGE);

    await this.channel.assertQueue(RABBIT_MQ_QUEUE_EAR_LIQUIDATION, {
      durable: true,
    });

    this.channel.consume(RABBIT_MQ_QUEUE_EAR_LIQUIDATION, async (msg: any) => {
      if (msg) {
        try {
          const messageFormatted = JSON.parse(msg.content.toString());
          await calculateDailyLiquidationInterest(
            messageFormatted,
            this.logger,
          );
        } catch (error) {
          const errorQueueName = ERROR_RABBIT_MQ_QUEUE_EAR_LIQUIDATION;
          this.logger.error(PROCESS_FAILED_MESSAGE, error);
          await this.sendToQueue(errorQueueName, msg);
          this.logger.error(MESSAGE_SENT(errorQueueName));
        }
      }
    });
  }
}
