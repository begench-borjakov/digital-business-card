import { Transform } from 'class-transformer';
import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

function trimString(value: unknown): unknown {
  if (typeof value === 'string') {
    return value.trim();
  }

  return value;
}

@InputType()
export class CreateSkillInput {
  @Field(() => String)
  @Transform(({ value }) => trimString(value))
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name!: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @Transform(({ value }) => trimString(value))
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  category?: string | null;
}
