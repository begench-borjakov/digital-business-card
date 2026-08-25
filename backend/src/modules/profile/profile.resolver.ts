import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpdateProfileInput } from './dto/update-profile.input';
import { toProfileRto } from './mappers/profile.mapper';
import { ProfileRto } from './rto/profile.rto';
import { ProfileService } from './profile.service';

@Resolver(() => ProfileRto)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => ProfileRto)
  async profile(): Promise<ProfileRto> {
    const profile = await this.profileService.getProfile();

    return toProfileRto(profile);
  }

  @Mutation(() => ProfileRto)
  async updateProfile(
    @Args('input') input: UpdateProfileInput,
  ): Promise<ProfileRto> {
    const profile = await this.profileService.updateProfile(input);

    return toProfileRto(profile);
  }
}
