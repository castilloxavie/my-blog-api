import { Type } from "class-transformer";
import { IsEmail, isNotEmpty, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  LastName: string;

  @IsString()
  @IsOptional()
  avatar?: string;

}


export class createUserDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ValidateNested()
  @Type(() => CreateProfileDto)
  @IsNotEmpty()
  profile: CreateProfileDto;

}

export class updateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}
