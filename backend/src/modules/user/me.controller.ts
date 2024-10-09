import { Controller } from "@nestjs/common";
import { MeService } from "./me.service";
import { Protected, Roles } from "@decorators";
import { UserRoles } from "./models";
import { RequestInterface } from "@guards";
import { Get, Request } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("Me")
@Controller("me")
export class MeController {
    constructor(private service: MeService) { }

    @ApiBearerAuth()
    @Protected(true)
    @Roles([UserRoles.user,])
    @Get()
    async getMe(@Request() request: RequestInterface): Promise<any> {
        await this.service.getMe(request.userId)
    }
}