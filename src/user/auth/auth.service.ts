import { Injectable,ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'

interface userInfo{
    name:string
    email:string
    phone:string
    password:string
    role:string
}

@Injectable()
export class AuthService {
    constructor( private readonly prismaService:PrismaService){}
    async signupService({email,password,name,phone,role}:userInfo){
        const isExist=await this.prismaService.user.findUnique({where:{email}})
        if(isExist){
            throw new ConflictException()
        }
        const hashedPassword= bcrypt.hashSync(password,10)
        const userData={name,email,phone,password:hashedPassword,role}
        const user=await this.prismaService.user.create({data:userData});
        delete user.password
        return user
    }
}
