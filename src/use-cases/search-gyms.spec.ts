import { InMemoryGymsRepository } from '@/repository/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymUseCase } from './search-gym'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('Search Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Javascript gym',
      description: null,
      phone: null,
      latitude: -22.8984199,
      longitude: -47.4044073,
    })

    await gymsRepository.create({
      title: 'typescript gym',
      description: null,
      phone: null,
      latitude: -22.8984199,
      longitude: -47.4044073,
    })

    const { gyms } = await sut.execute({
      query: 'Javascript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Javascript gym' })])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Javascript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -22.8984199,
        longitude: -47.4044073,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Javascript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Javascript Gym 21' }),
      expect.objectContaining({ title: 'Javascript Gym 22' }),
    ])
  })
})
