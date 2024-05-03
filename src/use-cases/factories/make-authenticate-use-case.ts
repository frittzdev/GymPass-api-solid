import { PrismaUsersRepository } from '@/repository/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const userRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(userRepository)

  return authenticateUseCase
}
