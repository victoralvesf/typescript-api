import { StormGlass } from '@src/clients/stormGlass'
import axios from 'axios'

import stormglassWeatherFixture from '@test/fixtures/stormglass_weather.json'
import stormglassNormalizedFixture from '@test/fixtures/stormglass_normalized.json'

jest.mock('axios')

describe('Stormglass client', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>

  it('should return the normalized forecast from the Stormglass service', async () => {
    const latitude = -33.9782726
    const longitude = 151.289824

    mockedAxios.get.mockResolvedValue({ data: stormglassWeatherFixture })

    const stormglass = new StormGlass(axios)
    const response = await stormglass.fetchPoints(latitude, longitude)

    expect(response).toEqual(stormglassNormalizedFixture)
  })
})
