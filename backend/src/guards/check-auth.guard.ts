
import { CategoryService } from "@modules";
import { BadRequestException, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { mock } from "node:test";
import { Observable } from "rxjs";
import { Protected } from "src/decorators";
import { TestContext } from "node:test";

export class CheckAuthGuard implements CanActivate {
    constructor( private reflector: Reflector) { }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest<Request>()
        const isProtected = this.reflector.get(Protected, context.getHandler())

        const bearerToken = request.headers['authorization']

        if (!(bearerToken && bearerToken.startsWith('Bearer') && bearerToken.split('Bearer ')[1]?.length)) {
            throw new BadRequestException('Please provide valid bearer token')
        }


        const token = bearerToken.split('Bearer')[1]

        return true
    }

}


describe ('CategoryService', ()=> {
    let CategoryService: CategoryService;
    let mockCategoryModel: Partial<typeof Category>;

    beforeEach(async ()=> {
        mockCategoryModel = {
            findAll: jest.fn().mockResolvedValue([{id: 1, name: 'Burgers'}])
        }
        const module = await TestContext.createTestingModule({
            
        })
    })

    
})