import { makeFetchUsersCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-users-check-ins-history-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInsHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInsHistoryQuerySchema.parse(request.query)

  const fetchCheckInHistoryUseCase = makeFetchUsersCheckInsHistoryUseCase()

  const { checkIns } = await fetchCheckInHistoryUseCase.execute({
    userId: request.user.sub,
    page,
  })

  return reply.status(200).send({ checkIns })
}
