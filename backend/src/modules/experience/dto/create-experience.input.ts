import { Transform } from 'class-transformer';
import { Field, InputType } from '@nestjs/graphql';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

function trimString({ value }: { value: unknown }): unknown {
  return typeof value === 'string' ? value.trim() : value;
}

function trimStringArray({ value }: { value: unknown }): unknown {
  return Array.isArray(value)
    ? value.map((item: unknown) =>
        typeof item === 'string' ? item.trim() : item,
      )
    : value;
}

@InputType()
export class CreateExperienceInput {
  @Field(() => String)
  @Transform(trimString)
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  company!: string;

  @Field(() => String)
  @Transform(trimString)
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  role!: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @Transform(trimString)
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  employmentType?: string | null;

  @Field(() => String)
  @Transform(trimString)
  @Matches(/^(0[1-9]|1[0-2])\/\d{4}$/, {
    message: 'startDate must use MM/YYYY format',
  })
  startDate!: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @Transform(trimString)
  @Matches(/^(0[1-9]|1[0-2])\/\d{4}$/, {
    message: 'endDate must use MM/YYYY format',
  })
  endDate?: string | null;

  @Field(() => Boolean, { defaultValue: false })
  @IsBoolean()
  current = false;

  @Field(() => String)
  @Transform(trimString)
  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  description!: string;

  @Field(() => [String])
  @Transform(trimStringArray)
  @IsArray()
  @ArrayMaxSize(30)
  @IsString({ each: true })
  @MinLength(1, { each: true })
  @MaxLength(200, { each: true })
  highlights!: string[];

  @Field(() => [String])
  @Transform(trimStringArray)
  @IsArray()
  @ArrayMaxSize(30)
  @IsString({ each: true })
  @MinLength(1, { each: true })
  @MaxLength(100, { each: true })
  technologies!: string[];
}
