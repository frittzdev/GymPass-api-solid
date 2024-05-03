import { CheckIn } from '@prisma/client'
import { CheckInRepository } from '@/repository/check-ins-repository'

interface FetchUsersCheckInsHistoryUseCaseRequest {
  userId: string
  page: number
}

interface FetchUsersCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUsersCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInRepository) {}

  async execute({
    userId,
    page,
  }: FetchUsersCheckInsHistoryUseCaseRequest): Promise<FetchUsersCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
