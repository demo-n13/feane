import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class EmailSenderDto {
    @ApiProperty({
        type: String,
        required: true,
        example: 'john.doe@gmail.com',
    })
    @IsEmail()
    email: string;
}