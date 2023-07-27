import { Controller,Get, Param, Post, Put } from '@nestjs/common';
import { HouseService } from './house.service';

@Controller('house')
export class HouseController {
    constructor(private readonly  houseService:HouseService){}
    //GET HOMES
    @Get()
    async getHouses(){
        return await this.houseService.getHouseService()
    }
    //GET A HOUSE
    @Get(':id')
    async getHouse(@Param('id') id:string){
        return {}
    }
    //CREATE A HOUSE
    @Post()
    async createHouse(){

    }

    //UPDATE A HOUSE
    @Put(':id')
    async updateHouse(@Param('id') id:string){

    }
}
