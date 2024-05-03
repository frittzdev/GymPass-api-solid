import { PrismaCheckInRepository } from '@/repository/prisma/prisma-check-in-repository'
import { FetchUsersCheckInsHistoryUseCase } from '../fetch-users-check-ins-history'

export function makeFetchUsersCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInRepository()
  const fetchUsersCheckInsHistoryUseCase = new FetchUsersCheckInsHistoryUseCase(
    checkInsRepository,
  )

  return fetchUsersCheckInsHistoryUseCase
}
