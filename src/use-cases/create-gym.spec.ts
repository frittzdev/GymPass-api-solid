import { InMemoryGymsRepository } from '@/repository/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'javascript gym',
      description: null,
      phone: null,
      latitude: -22.8984199,
      longitude: -47.4044073,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
