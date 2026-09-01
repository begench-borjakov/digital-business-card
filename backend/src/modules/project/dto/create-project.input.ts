import { Transform } from 'class-transformer';
import { Field, InputType } from '@nestjs/graphql';
import {
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

function trimString(value: unknown): unknown {
  if (typeof value === 'string') {
    return value.trim();
  }

  return value;
}

@InputType()
export class CreateProjectInput {
  @Field(() => String)
  @Transform(({ value }) => trimString(value))
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name!: string;

  @Field(() => String)
  @Transform(({ value }) => trimString(value))
  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  description!: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @Transform(({ value }) => trimString(value))
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  technologies?: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @Transform(({ value }) => trimString(value))
  @IsUrl({
    protocols: ['http', 'https'],
    require_protocol: true,
  })
  githubUrl?: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @Transform(({ value }) => trimString(value))
  @IsUrl({
    protocols: ['http', 'https'],
    require_protocol: true,
  })
  demoUrl?: string | null;
}
