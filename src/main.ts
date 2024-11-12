import { PORT, TIME_ZONE } from '@constants/app-config';
import { EarLiquidatorWorker } from '@ear-liquidator/worker';
import { NestFactory } from '@nestjs/core';
import { TwoFaEmailControllerWorker } from '@two-fa-email-controller/worker';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
  process.env.TZ = TIME_ZONE;

  // Worker initialization
  const earLiquidatorWorker = new EarLiquidatorWorker();
  await earLiquidatorWorker.startListening();

  const twoFaEmailControllerWorker = new TwoFaEmailControllerWorker();
  await twoFaEmailControllerWorker.startListening();
}
bootstrap();
