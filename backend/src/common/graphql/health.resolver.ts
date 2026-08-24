import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HealthResolver {
  @Query(() => String, { description: 'Checks whether the API is available' })
  health(): string {
    return 'ok';
  }
}
