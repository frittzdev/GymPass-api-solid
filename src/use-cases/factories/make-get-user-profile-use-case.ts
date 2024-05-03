import { PrismaUsersRepository } from '@/repository/prisma/prisma-users-repository'
import { GetUserProfileUseCase } from '../get-user-profile'

export function makeGetUserProfileUseCase() {
  const userRepository = new PrismaUsersRepository()
  const getUserProfileUseCase = new GetUserProfileUseCase(userRepository)

  return getUserProfileUseCase
}
