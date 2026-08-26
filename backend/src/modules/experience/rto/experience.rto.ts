import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ExperienceRto {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  company!: string;

  @Field(() => String)
  role!: string;

  @Field(() => String, { nullable: true })
  employmentType!: string | null;

  @Field(() => String)
  startDate!: string;

  @Field(() => String, { nullable: true })
  endDate!: string | null;

  @Field(() => Boolean)
  current!: boolean;

  @Field(() => String)
  description!: string;

  @Field(() => [String])
  highlights!: string[];

  @Field(() => [String])
  technologies!: string[];

  @Field(() => String)
  profileId!: string;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}
