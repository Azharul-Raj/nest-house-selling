import { IsString,IsNotEmpty,IsEmail,MinLength,Matches } from "class-validator"


export class signupDto{
    @IsString()
    @IsNotEmpty()
    name:string

    @IsEmail()
    email:string

    @Matches(/(^([+]{1}[8]{2}|0088)?(01){1}[3-9]{1}\d{8})$/,{message:"You should provide valid Bangladeshi Number"})
    phone:string

    @IsString()
    @MinLength(5)
    password:string
}