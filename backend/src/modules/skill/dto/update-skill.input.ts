import { Transform } from 'class-transformer';
import { Field, InputType } from '@nestjs/graphql';
import {
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

function trimString(value: unknown): unknown {
  if (typeof value === 'string') {
    return value.trim();
  }

  return value;
}

function isProvided(value: unknown): boolean {
  if (value !== undefined) {
    return true;
  }

  return false;
}

@InputType()
export class UpdateSkillInput {
  @Field(() => String, { nullable: true })
  @ValidateIf((_object, value) => isProvided(value))
  @Transform(({ value }) => trimString(value))
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @Transform(({ value }) => trimString(value))
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  category?: string | null;
}
