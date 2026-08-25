import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProfileRepository } from '../profile/profile.repository';
import type { ProjectEntity } from './entities/project.entity';
import { ProjectRepository } from './project.repository';
import type {
  CreateProjectData,
  CreateProjectRepositoryData,
  UpdateProjectData,
} from './types/project.types';

@Injectable()
export class ProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly profileRepository: ProfileRepository,
  ) {}

  async getProjects(): Promise<ProjectEntity[]> {
    return this.projectRepository.findAll();
  }

  async getProject(id: string): Promise<ProjectEntity> {
    const project = await this.projectRepository.findById(id);

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async createProject(data: CreateProjectData): Promise<ProjectEntity> {
    const profile = await this.profileRepository.findFirst();

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    const repositoryData: CreateProjectRepositoryData = {
      ...data,
      profileId: profile.id,
    };

    return this.projectRepository.create(repositoryData);
  }

  async updateProject(
    id: string,
    data: UpdateProjectData,
  ): Promise<ProjectEntity> {
    const hasUpdates = Object.values(data).some((value) => value !== undefined);

    if (!hasUpdates) {
      throw new BadRequestException('At least one field must be provided');
    }

    const project = await this.projectRepository.findById(id);

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return this.projectRepository.update(id, data);
  }

  async deleteProject(id: string): Promise<ProjectEntity> {
    const project = await this.projectRepository.findById(id);

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return this.projectRepository.delete(id);
  }
}
