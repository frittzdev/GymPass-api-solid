import { CheckInsRepository } from '@/repository/check-ins-repository'

interface GetUserMetricsUseCaseRequest {
  userId: string
}

interface GetUserMetricsUseCaseResposne {
  checkInsCount: number
}

export class GetUserMetricsUseCase {
  constructor(private checkInsRepesitory: CheckInsRepository) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResposne> {
    const checkInsCount = await this.checkInsRepesitory.countByUserId(userId)

    return {
      checkInsCount,
    }
  }
}
