import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProjectRto {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  description!: string;

  @Field(() => String, { nullable: true })
  technologies!: string | null;

  @Field(() => String, { nullable: true })
  githubUrl!: string | null;

  @Field(() => String, { nullable: true })
  demoUrl!: string | null;

  @Field(() => String)
  profileId!: string;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}
