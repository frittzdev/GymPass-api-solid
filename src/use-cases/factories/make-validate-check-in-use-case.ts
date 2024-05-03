import { PrismaCheckInRepository } from '@/repository/prisma/prisma-check-in-repository'
import { ValidateCheckInUseCase } from '../validate-check-in'

export function makeValidateCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInRepository()
  const validateCheckInUseCase = new ValidateCheckInUseCase(checkInsRepository)

  return validateCheckInUseCase
}
