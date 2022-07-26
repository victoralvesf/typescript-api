import { AxiosStatic } from 'axios'

export interface StormGlassPointSource {
  noaa: number
}

export interface StormGlassPoint {
  readonly swellDirection: StormGlassPointSource
  readonly swellHeight: StormGlassPointSource
  readonly swellPeriod: StormGlassPointSource
  readonly time: string
  readonly waveDirection: StormGlassPointSource
  readonly waveHeight: StormGlassPointSource
  readonly windDirection: StormGlassPointSource
  readonly windSpeed: StormGlassPointSource
}

export interface StormGlassForecastResponse {
  hours: StormGlassPoint[]
}

export interface ForecastPoint {
  swellDirection: number
  swellHeight: number
  swellPeriod: number
  time: string
  waveDirection: number
  waveHeight: number
  windDirection: number
  windSpeed: number
}

export class StormGlass {
  readonly stormGlassAPISource = 'noaa'
  constructor (protected request: AxiosStatic) { }

  public async fetchPoints (latitude: number, longitude: number): Promise<ForecastPoint[]> {
    const response = await this.request.get('https://localhost:3004/points')

    return this.normalizeResponse(response.data)
  }

  private normalizeResponse (points: StormGlassForecastResponse): ForecastPoint[] {
    return points.hours.filter(this.isValidPoint.bind(this)).map(point => ({
      swellDirection: point.swellDirection[this.stormGlassAPISource],
      swellHeight: point.swellHeight[this.stormGlassAPISource],
      swellPeriod: point.swellPeriod[this.stormGlassAPISource],
      time: point.time,
      waveDirection: point.waveDirection[this.stormGlassAPISource],
      waveHeight: point.waveHeight[this.stormGlassAPISource],
      windDirection: point.windDirection[this.stormGlassAPISource],
      windSpeed: point.windSpeed[this.stormGlassAPISource]
    }))
  }

  private isValidPoint (point: Partial<StormGlassPoint>): boolean {
    return !!(
      point.time &&
      point.swellDirection?.[this.stormGlassAPISource] &&
      point.swellHeight?.[this.stormGlassAPISource] &&
      point.swellPeriod?.[this.stormGlassAPISource] &&
      point.waveDirection?.[this.stormGlassAPISource] &&
      point.waveHeight?.[this.stormGlassAPISource] &&
      point.windDirection?.[this.stormGlassAPISource] &&
      point.windSpeed?.[this.stormGlassAPISource]
    )
  }
}
