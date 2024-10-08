import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../user";
import { LoginRequest, LoginResponse } from "./interfaces";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { config } from "process";

@Injectable()
export class AuthService {
    constructor(@InjectModel(User) private userModel: typeof User,
    private configService : ConfigService,
    private jwtService : JwtService
) { }

    async login(payload: LoginRequest): Promise<LoginResponse> {
        const user = await this.userModel.findOne({
            where: { email: payload.email, phone: payload.phone }
        });

        if(!user)
            throw new NotFoundException('User not found')

        const acces_token = await this.jwtService.signAsync({ id: user.id,role : user.role },{
            secret : this.configService.get<string>("jwt.accessKey"),
            expiresIn : this.configService.get<string>("jwt.accessTime")
        });

        const refresh_token = await  this.jwtService.signAsync({ id: user.id,role : user.role },{
            secret : this.configService.get<string>("jwt.refreshKey"),
            expiresIn : this.configService.get<string>("jwt.refreshTime")
        });

        return {
            accessToken : acces_token,
            refreshToken : refresh_token,
            message : 'LoggedIn'
        }
    }
    async register() { }
    async logout() { }
    async refresh() { }
}