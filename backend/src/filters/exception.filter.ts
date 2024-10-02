import { ArgumentsHost, Catch, HttpException, HttpStatus, ExceptionFilter } from "@nestjs/common";
import { Request, Response } from "express"; 

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;


        const message = exception instanceof HttpException
            ? exception.getResponse()
            : { message: 'Internal server error' };
        

        response.status(status).json({
            statusCode: status,
            path: request.url,
            message: message
        })
    }
}