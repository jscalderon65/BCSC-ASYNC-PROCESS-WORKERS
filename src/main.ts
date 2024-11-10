import { PORT, TIME_ZONE } from '@constants/app-config';
import { EarLiquidatorWorker } from '@ear-liquidator/worker';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
  process.env.TZ = TIME_ZONE;

  // Worker initialization
  const earLiquidatorWorker = new EarLiquidatorWorker();
  await earLiquidatorWorker.startListening();
}
bootstrap();
