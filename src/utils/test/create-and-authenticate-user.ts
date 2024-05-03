import request from 'supertest'
import { FastifyInstance } from 'fastify'
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@exemplo.com',
      password_hash: await hash('12345678', 8),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@exemplo.com',
    password: '12345678',
  })

  const { token } = authResponse.body

  return { token }
}
