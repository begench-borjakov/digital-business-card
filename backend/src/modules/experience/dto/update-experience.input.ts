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
  ValidateIf,
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

function isProvided(_object: unknown, value: unknown): boolean {
  return value !== undefined;
}

@InputType()
export class UpdateExperienceInput {
  @Field(() => String, { nullable: true })
  @ValidateIf(isProvided)
  @Transform(trimString)
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  company?: string;

  @Field(() => String, { nullable: true })
  @ValidateIf(isProvided)
  @Transform(trimString)
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  role?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @Transform(trimString)
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  employmentType?: string | null;

  @Field(() => String, { nullable: true })
  @ValidateIf(isProvided)
  @Transform(trimString)
  @Matches(/^(0[1-9]|1[0-2])\/\d{4}$/, {
    message: 'startDate must use MM/YYYY format',
  })
  startDate?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @Transform(trimString)
  @Matches(/^(0[1-9]|1[0-2])\/\d{4}$/, {
    message: 'endDate must use MM/YYYY format',
  })
  endDate?: string | null;

  @Field(() => Boolean, { nullable: true })
  @ValidateIf(isProvided)
  @IsBoolean()
  current?: boolean;

  @Field(() => String, { nullable: true })
  @ValidateIf(isProvided)
  @Transform(trimString)
  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  description?: string;

  @Field(() => [String], { nullable: true })
  @ValidateIf(isProvided)
  @Transform(trimStringArray)
  @IsArray()
  @ArrayMaxSize(30)
  @IsString({ each: true })
  @MinLength(1, { each: true })
  @MaxLength(200, { each: true })
  highlights?: string[];

  @Field(() => [String], { nullable: true })
  @ValidateIf(isProvided)
  @Transform(trimStringArray)
  @IsArray()
  @ArrayMaxSize(30)
  @IsString({ each: true })
  @MinLength(1, { each: true })
  @MaxLength(100, { each: true })
  technologies?: string[];
}
