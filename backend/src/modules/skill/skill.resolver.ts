import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateSkillInput } from './dto/create-skill.input';
import { UpdateSkillInput } from './dto/update-skill.input';
import { toSkillRto } from './mappers/skill.mapper';
import { SkillRto } from './rto/skill.rto';
import { SkillService } from './skill.service';

@Resolver(() => SkillRto)
export class SkillResolver {
  constructor(private readonly skillService: SkillService) {}

  @Query(() => [SkillRto])
  async skills(): Promise<SkillRto[]> {
    const skills = await this.skillService.getSkills();

    return skills.map(toSkillRto);
  }

  @Query(() => SkillRto)
  async skill(@Args('id', { type: () => ID }) id: string): Promise<SkillRto> {
    const skill = await this.skillService.getSkill(id);

    return toSkillRto(skill);
  }

  @Mutation(() => SkillRto)
  async createSkill(@Args('input') input: CreateSkillInput): Promise<SkillRto> {
    const skill = await this.skillService.createSkill(input);

    return toSkillRto(skill);
  }

  @Mutation(() => SkillRto)
  async updateSkill(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateSkillInput,
  ): Promise<SkillRto> {
    const skill = await this.skillService.updateSkill(id, input);

    return toSkillRto(skill);
  }

  @Mutation(() => SkillRto)
  async deleteSkill(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<SkillRto> {
    const skill = await this.skillService.deleteSkill(id);

    return toSkillRto(skill);
  }
}
