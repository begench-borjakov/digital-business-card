import { Transform } from 'class-transformer';
import { Field, InputType } from '@nestjs/graphql';
import {
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

function trimString({ value }: { value: unknown }): unknown {
  return typeof value === 'string' ? value.trim() : value;
}

function isProvided(_object: unknown, value: unknown): boolean {
  return value !== undefined;
}

@InputType()
export class UpdateSkillInput {
  @Field(() => String, { nullable: true })
  @ValidateIf(isProvided)
  @Transform(trimString)
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @Transform(trimString)
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  category?: string | null;
}
