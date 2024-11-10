import { EarLiquidatorWorker } from '@ear-liquidator/worker';
import { Module } from '@nestjs/common';

@Module({
  providers: [EarLiquidatorWorker],
})
export class AppModule {}
