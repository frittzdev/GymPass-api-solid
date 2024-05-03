import { InMemoryUsersRepository } from '@/repository/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let userRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(userRepository)
  })

  it('should be able to authenticate', async () => {
    await userRepository.create({
      name: 'John Doe',
      email: 'jonhdoe@exemplo.com',
      password_hash: await hash('12345678', 8),
    })

    const { user } = await sut.execute({
      email: 'jonhdoe@exemplo.com',
      password: '12345678',
    })
    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    expect(() =>
      sut.execute({
        email: 'jonh@exemplo.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await userRepository.create({
      name: 'John Doe',
      email: 'jonhdoe@exemplo.com',
      password_hash: await hash('12345678', 8),
    })

    await expect(() =>
      sut.execute({
        email: 'jonh@exemplo.com',
        password: '123123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
