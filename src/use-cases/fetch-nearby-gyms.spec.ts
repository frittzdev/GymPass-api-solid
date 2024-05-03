import { InMemoryGymsRepository } from '@/repository/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Search Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near gym',
      description: null,
      phone: null,
      latitude: -22.8984199,
      longitude: -47.4044073,
    })

    await gymsRepository.create({
      title: 'far gym',
      description: null,
      phone: null,
      latitude: -23.1856528,
      longitude: -46.887883,
    })

    const { gyms } = await sut.execute({
      userLatitude: -22.8984199,
      userLongitude: -47.4044073,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near gym' })])
  })
})
