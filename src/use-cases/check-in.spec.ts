import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repository/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repository/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumbersOfCheckInsError } from './errors/max-numbers-of-check-ins'

let userRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    userRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(userRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'javascript gym',
      description: '',
      phone: '',
      latitude: -22.8984199,
      longitude: -47.4044073,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.8984199,
      userLongitude: -47.4044073,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.8984199,
      userLongitude: -47.4044073,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -22.8984199,
        userLongitude: -47.4044073,
      }),
    ).rejects.toBeInstanceOf(MaxNumbersOfCheckInsError)
  })

  it('should be able to check in twice but in diferent days', async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.8984199,
      userLongitude: -47.4044073,
    })

    vi.setSystemTime(new Date(2024, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.8984199,
      userLongitude: -47.4044073,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'javascript gym',
      description: '',
      phone: '',
      latitude: new Decimal(-22.8984199),
      longitude: new Decimal(-47.4044073),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -22.8784936,
        userLongitude: -47.0653761,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
