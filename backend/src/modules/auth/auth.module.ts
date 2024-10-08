import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { User } from "../user";
import { MailModule } from "../mailer/mail.module";

@Module({
    imports: [SequelizeModule.forFeature([User]),MailModule],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {}