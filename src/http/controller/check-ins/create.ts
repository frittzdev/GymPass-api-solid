import { MaxDistanceError } from '@/use-cases/errors/max-distance-error'
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const createCheckInBodySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
  })

  const { latitude, longitude } = createCheckInBodySchema.parse(request.body)

  const { gymId } = createCheckInParamsSchema.parse(request.params)

  const createCheckInUseCase = makeCheckInUseCase()

  try {
    await createCheckInUseCase.execute({
      gymId,
      userId: request.user.sub,
      userLatitude: latitude,
      userLongitude: longitude,
    })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof MaxDistanceError) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }
}
