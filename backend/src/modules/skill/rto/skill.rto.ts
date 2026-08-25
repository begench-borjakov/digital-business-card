import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SkillRto {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String, { nullable: true })
  category!: string | null;

  @Field(() => String)
  profileId!: string;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}
