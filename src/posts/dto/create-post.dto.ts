import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({description: "El titulo de la publicación"})
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({description: "El contenido de la publicación"})
  content: string;

  @IsString()
  @IsOptional()
  @ApiProperty({description: "La URL de la imagen de portada de la publicación"})
  coverImage: string;

  @IsString()
  @IsOptional()
  @ApiProperty({description: "El resumen de la publicación"})
  sumary: string;

  // @IsNumber()
  // @IsNotEmpty()
  // userId: number

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  @ApiProperty({description: "Los IDs de las categorías asociadas a la publicación"})
  categories: number[]
}

