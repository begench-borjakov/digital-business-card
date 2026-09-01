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

function trimString(value: unknown): unknown {
  if (typeof value === 'string') {
    return value.trim();
  }

  return value;
}

function trimStringArray(value: unknown): unknown {
  if (!Array.isArray(value)) {
    return value;
  }

  return value.map((item: unknown) => {
    if (typeof item === 'string') {
      return item.trim();
    }

    return item;
  });
}

@InputType()
export class CreateExperienceInput {
  @Field(() => String)
  @Transform(({ value }) => trimString(value))
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  company!: string;

  @Field(() => String)
  @Transform(({ value }) => trimString(value))
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  role!: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @Transform(({ value }) => trimString(value))
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  employmentType?: string | null;

  @Field(() => String)
  @Transform(({ value }) => trimString(value))
  @Matches(/^(0[1-9]|1[0-2])\/\d{4}$/, {
    message: 'startDate must use MM/YYYY format',
  })
  startDate!: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @Transform(({ value }) => trimString(value))
  @Matches(/^(0[1-9]|1[0-2])\/\d{4}$/, {
    message: 'endDate must use MM/YYYY format',
  })
  endDate?: string | null;

  @Field(() => Boolean, { defaultValue: false })
  @IsBoolean()
  current = false;

  @Field(() => String)
  @Transform(({ value }) => trimString(value))
  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  description!: string;

  @Field(() => [String])
  @Transform(({ value }) => trimStringArray(value))
  @IsArray()
  @ArrayMaxSize(30)
  @IsString({ each: true })
  @MinLength(1, { each: true })
  @MaxLength(200, { each: true })
  highlights!: string[];

  @Field(() => [String])
  @Transform(({ value }) => trimStringArray(value))
  @IsArray()
  @ArrayMaxSize(30)
  @IsString({ each: true })
  @MinLength(1, { each: true })
  @MaxLength(100, { each: true })
  technologies!: string[];
}
