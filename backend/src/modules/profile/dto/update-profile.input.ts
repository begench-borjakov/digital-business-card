import { Transform } from 'class-transformer';
import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
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
export class UpdateProfileInput {
  @Field(() => String, { nullable: true })
  @ValidateIf(isProvided)
  @Transform(trimString)
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name?: string;

  @Field(() => String, { nullable: true })
  @ValidateIf(isProvided)
  @Transform(trimString)
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  title?: string;

  @Field(() => String, { nullable: true })
  @ValidateIf(isProvided)
  @Transform(trimString)
  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  about?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @Transform(trimString)
  @IsEmail()
  @MaxLength(255)
  email?: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @Transform(trimString)
  @IsString()
  @Matches(/^\+?[0-9\s().-]{7,30}$/, {
    message: 'phone must be a valid phone number',
  })
  @MaxLength(30)
  phone?: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @Transform(trimString)
  @IsString()
  @Matches(
    /^(?:@[A-Za-z0-9_]{5,32}|https?:\/\/(?:www\.)?t\.me\/[A-Za-z0-9_]{5,32}\/?)$/i,
    {
      message: 'telegram must be @username or a valid t.me URL',
    },
  )
  @MaxLength(100)
  telegram?: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @Transform(trimString)
  @IsUrl({
    protocols: ['http', 'https'],
    require_protocol: true,
  })
  @Matches(
    /^https?:\/\/(?:www\.)?github\.com\/[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?\/?$/i,
    {
      message: 'githubUrl must be a valid GitHub profile URL',
    },
  )
  @MaxLength(500)
  githubUrl?: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @Transform(trimString)
  @IsUrl({
    protocols: ['http', 'https'],
    require_protocol: true,
  })
  @Matches(/^https?:\/\/(?:www\.)?linkedin\.com\/in\/[A-Za-z0-9_.%-]+\/?$/i, {
    message: 'linkedinUrl must be a valid LinkedIn profile URL',
  })
  @MaxLength(500)
  linkedinUrl?: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @Transform(trimString)
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  location?: string | null;
}
