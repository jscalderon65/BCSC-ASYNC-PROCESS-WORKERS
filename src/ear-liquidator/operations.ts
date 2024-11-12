import { axiosInstance } from '@ear-liquidator/common/axios/axios-instance';
import { EAR_VALUE } from '@ear-liquidator/common/constants/config-worker';
import {
  CREATE_EAR_LIQUIDATION_URL,
  SAVINGS_ACCOUNTS_UPDATE_BALANCE,
} from '@ear-liquidator/common/constants/url';
import { CreateEarLiquidationDto } from '@ear-liquidator/common/dto/create-ear-liquidation.dto';
import { UpdateBalanceAccountDto } from '@ear-liquidator/common/dto/ubdate-balance-account.dto';
import { SavingsAccount } from '@ear-liquidator/interfaces/savings-accounts.interface';
import { Logger } from '@nestjs/common';

export async function calculateDailyLiquidationInterest(
  savingAccount: SavingsAccount,
  logger: Logger,
): Promise<void> {
  const earValue = EAR_VALUE;
  const liquidationBase = savingAccount.balance;
  const dailyRate = Math.pow(1 + earValue, 1 / 365) - 1;
  const generatedInterest = Number((liquidationBase * dailyRate).toFixed(2));

  const newEarLiquidation: CreateEarLiquidationDto = {
    account_id: savingAccount._id,
    annual_effective_rate: earValue.toString(),
    liquidation_base: liquidationBase,
    generated_interest: generatedInterest,
  };

  await axiosInstance.post(CREATE_EAR_LIQUIDATION_URL, newEarLiquidation);

  const updateBalanceAccountDto: UpdateBalanceAccountDto = {
    account_id: savingAccount._id,
    amount: generatedInterest,
    is_increment: true,
  };
  logger.log(`Liquidation created for account ${savingAccount._id}`);

  await axiosInstance.post(
    SAVINGS_ACCOUNTS_UPDATE_BALANCE(savingAccount._id),
    updateBalanceAccountDto,
  );

  logger.log(`Updated balance for account ${savingAccount._id}`);
}
