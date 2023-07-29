import { Controller,Delete,Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { HouseService } from './house.service';
import { houseResponseDto } from 'src/dtos/houseDto';
import { PropertyType } from '@prisma/client';

@Controller('house')
export class HouseController {
    constructor(private readonly  houseService:HouseService){}
    //GET HOMES
    @Get()
    async getHouses(
        @Query('city') city?:string,
        @Query('minPrice') minPrice?:string,
        @Query('maxPrice') maxPrice?:string,
        @Query('propertyType') propertyType?:PropertyType
    ):Promise<houseResponseDto[]>{
        const filters={
            city,
            minPrice:Number(minPrice),
            maxPrice:Number(maxPrice),
            propertyType
        }
        const houses= await this.houseService.getHousesService(filters);
        if(!houses.length){
            throw new NotFoundException()
        }
        return houses.map(house=>new houseResponseDto(house))
    }
    //GET A HOUSE
    @Get(':id')
    async getHouse(@Param('id') id:string):Promise<houseResponseDto>{
        const house=await this.houseService.getHouseService(id);
        return new houseResponseDto(house)
    }
    //CREATE A HOUSE
    @Post() 
    async createHouse(){

    }

    //UPDATE A HOUSE
    @Put(':id')
    async updateHouse(@Param('id') id:string){

    }
    //DELETE A HOUSE
    @Delete(':id')
    async deleteHouse(@Param('id') id:string){
        
    }
}
