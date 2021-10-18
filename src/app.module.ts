import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ArticlesModule } from "./articles/articles.module";
import { UsersModule } from "./users/users.module";
import { CategoriesModule } from "./categories/categories.module";
import { AuthModule } from "./auth/auth.module";
import { AccountsModule } from "./accounts/accounts.module";
import { RoutesModule } from "./routes/routes.module";
import { UtilsModule } from "./utils/utils.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ArticlesModule,
    UsersModule,
    CategoriesModule,
    AuthModule,
    AccountsModule,
    RoutesModule,
    UtilsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
