import { Injectable } from '@nestjs/common';
import { PropertyType } from '@prisma/client';
import { houseResponseDto } from 'src/dtos/houseDto';
import { PrismaService } from 'src/prisma/prisma.service';

interface filterParams{
    city?:string
    minPrice?:number
    maxPrice?:number
    propertyType:PropertyType
}

@Injectable()
export class HouseService {
    constructor(private readonly  prismaService:PrismaService){}
    //get house service
    async getHousesService(filters:filterParams){
        const houses= await this.prismaService.house.findMany({
            where:filters,
            select:{
                id:true,
                address:true,
                city:true,
                price:true,
                property_type:true,
                bathrooms:true,
                bedrooms:true,
                Images:{
                    select:{
                        url:true
                    },
                    take:1
                }
            }
        })
        // return houses.map(house=>new houseResponseDto(house))
        return houses.map(house=>{
            const fetchedHouse={...house,image:house.Images[0].url}
            delete fetchedHouse.Images
           return new houseResponseDto(fetchedHouse)
        })
    }
    //get a house
    async getHouseService(id){
        return await this.prismaService.house.findUnique({where:{id}})
    }
}
