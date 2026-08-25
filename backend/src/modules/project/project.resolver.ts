import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { toProjectRto } from './mappers/project.mapper';
import { ProjectRto } from './rto/project.rto';
import { ProjectService } from './project.service';

@Resolver(() => ProjectRto)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Query(() => [ProjectRto])
  async projects(): Promise<ProjectRto[]> {
    const projects = await this.projectService.getProjects();

    return projects.map(toProjectRto);
  }

  @Query(() => ProjectRto)
  async project(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<ProjectRto> {
    const project = await this.projectService.getProject(id);

    return toProjectRto(project);
  }

  @Mutation(() => ProjectRto)
  async createProject(
    @Args('input') input: CreateProjectInput,
  ): Promise<ProjectRto> {
    const project = await this.projectService.createProject(input);

    return toProjectRto(project);
  }

  @Mutation(() => ProjectRto)
  async updateProject(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateProjectInput,
  ): Promise<ProjectRto> {
    const project = await this.projectService.updateProject(id, input);

    return toProjectRto(project);
  }

  @Mutation(() => ProjectRto)
  async deleteProject(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<ProjectRto> {
    const project = await this.projectService.deleteProject(id);

    return toProjectRto(project);
  }
}
