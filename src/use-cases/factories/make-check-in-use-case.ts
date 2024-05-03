import { PrismaCheckInRepository } from '@/repository/prisma/prisma-check-in-repository'
import { CheckInUseCase } from '../check-in'
import { PrismaGymsRepository } from '@/repository/prisma/prisma-gyms-repository'

export function makeCheckInUseCase() {
  const checkInRepoitory = new PrismaCheckInRepository()
  const gymsRepository = new PrismaGymsRepository()
  const checkInUseCase = new CheckInUseCase(checkInRepoitory, gymsRepository)

  return checkInUseCase
}
