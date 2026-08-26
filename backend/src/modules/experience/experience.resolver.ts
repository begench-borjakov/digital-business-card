import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateExperienceInput } from './dto/create-experience.input';
import { UpdateExperienceInput } from './dto/update-experience.input';
import { toExperienceRto } from './mappers/experience.mapper';
import { ExperienceRto } from './rto/experience.rto';
import { ExperienceService } from './experience.service';

@Resolver(() => ExperienceRto)
export class ExperienceResolver {
  constructor(private readonly experienceService: ExperienceService) {}

  @Query(() => [ExperienceRto])
  async experiences(): Promise<ExperienceRto[]> {
    const experiences = await this.experienceService.getExperiences();

    return experiences.map(toExperienceRto);
  }

  @Query(() => ExperienceRto)
  async experience(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<ExperienceRto> {
    const experience = await this.experienceService.getExperience(id);

    return toExperienceRto(experience);
  }

  @Mutation(() => ExperienceRto)
  async createExperience(
    @Args('input') input: CreateExperienceInput,
  ): Promise<ExperienceRto> {
    const experience = await this.experienceService.createExperience(input);

    return toExperienceRto(experience);
  }

  @Mutation(() => ExperienceRto)
  async updateExperience(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateExperienceInput,
  ): Promise<ExperienceRto> {
    const experience = await this.experienceService.updateExperience(id, input);

    return toExperienceRto(experience);
  }

  @Mutation(() => ExperienceRto)
  async deleteExperience(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<ExperienceRto> {
    const experience = await this.experienceService.deleteExperience(id);

    return toExperienceRto(experience);
  }
}
