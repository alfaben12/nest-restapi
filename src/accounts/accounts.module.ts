import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AccountsService } from './accounts.service';

@Module({
  imports: [UsersModule],
  providers: [AccountsService],
  exports: [AccountsService],
})
export class AccountsModule {}
