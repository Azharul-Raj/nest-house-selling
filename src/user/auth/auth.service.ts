import { Injectable,ConflictException,HttpException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'

import { getToken } from 'src/utils/getToken';


interface userInfo{
    name:string
    email:string
    phone:string
    password:string
    role:string
}

interface signInInfo{
    email:string
    password:string
}

@Injectable()
export class AuthService {
    constructor( private readonly prismaService:PrismaService){}
    //SIGNUP SERVICE
    async signupService({email,password,name,phone,role}:userInfo){
        const isExist=await this.prismaService.user.findUnique({where:{email}})
        if(isExist){
            throw new ConflictException()
        }
        const hashedPassword= bcrypt.hashSync(password,10)
        const userData={name,email,phone,password:hashedPassword,role}
        const user=await this.prismaService.user.create({data:userData});
        return await getToken(email)
    }
    //SIGNIN SERVICE
    async signInService({email,password}:signInInfo){
        const user=await this.prismaService.user.findUnique({where:{email}})
        if(!user){
            throw new HttpException('No user found with the credentials',404)
        }
        const isValidPassword=bcrypt.compare(password,user.password)
        if(!isValidPassword){
            return new HttpException('Invalid Credentials',400)
        }
        return await getToken(email)
    }
    //get user
    async getUserService(id){
        return await this.prismaService.user.findUnique({where:{id}})
    }
}
