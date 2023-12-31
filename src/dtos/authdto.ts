import { UserType } from "@prisma/client"
import { IsString,IsNotEmpty,IsEmail,MinLength,Matches, IsEnum } from "class-validator"


export class signupDto{
    @IsString()
    @IsNotEmpty({message:"name must be string and can't be empty."})
    name:string

    @IsEmail()
    email:string

    @Matches(/(^([+]{1}[8]{2}|0088)?(01){1}[3-9]{1}\d{8})$/,{message:"You should provide valid Bangladeshi Number"})
    phone:string

    @IsString({message:"Password length should be 5 or more."})
    @MinLength(5)
    password:string

    @IsEnum(UserType)
    role:'admin'|'buyer'|'realtor'
}

export class signinDto{
    @IsEmail()
    email:string

    @IsString()
    @IsNotEmpty()
    password:string
}

export class generateKeyDto{
    @IsEmail()
    email:string

    @IsEnum(UserType)
    role:'admin'|'buyer'|'realtor'
}