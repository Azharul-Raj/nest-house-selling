import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HouseService {
    constructor(private readonly  prismaService:PrismaService){}
    //get house service
    async getHouseService(){
        return await this.prismaService.house.findMany()
    }
}
