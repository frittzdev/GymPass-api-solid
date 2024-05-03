import { GetUserMetricsUseCase } from '../get-user-metrics'
import { PrismaCheckInRepository } from '@/repository/prisma/prisma-check-in-repository'

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInRepository()
  const getUserMetricsUseCase = new GetUserMetricsUseCase(checkInsRepository)

  return getUserMetricsUseCase
}
