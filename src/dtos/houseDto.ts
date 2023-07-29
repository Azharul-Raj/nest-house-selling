import {  PropertyType } from '@prisma/client';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString, ValidateNested } from 'class-validator';

// type modifiedImage = Omit<
//   Image,
//   'id' | 'created_at' | 'updated_at' | 'house_id'
// > & {
//   id?: string;
//   created_at?: string;
//   updated_at?: string;
//   house_id?: string;
// };

interface Image{
  url:string
}

export class houseResponseDto {
  id: string;
  address: string;
  bathrooms: number;
  bedrooms: number;
  city: string;

  @Exclude()
  listed_date: Date;

  @Expose({ name: 'listedDate' })
  listedDate() {
    return this.listedDate;
  }

  price: number;

  @Exclude()
  land_size: number;

  @Expose({ name: 'landSize' })
  landSize() {
    return this.landSize;
  }

  @Exclude()
  property_type: PropertyType;

  @Expose({ name: 'propertyType' })
  propertyType() {
    return this.propertyType;
  }

  realtor: string;

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;

  constructor(partial: Partial<houseResponseDto>) {
    Object.assign(this, partial);
  }
}

export class createHouseDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNumber()
  @IsPositive()
  bathrooms: number;

  @IsNumber()
  @IsPositive()
  bedrooms: number;

  @IsString()
  @IsNotEmpty()
  city: string;
  listed_date: Date;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  land_size: number;

  @IsEnum(PropertyType)
  property_type: PropertyType;

  @IsArray()
  @ValidateNested({each:true})
  @Type(()=>Image)
  images:Image[]
}
