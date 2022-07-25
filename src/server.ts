import { Server } from '@overnightjs/core'
import { json, Application } from 'express'
import { ForecastController } from '@src/controllers/forecast'

import './util/module-alias'

export class SetupServer extends Server {
  constructor (private readonly port = 3000) {
    super()
  }

  public init (): void {
    this.setupExpress()
    this.setupControllers()
  }

  private setupExpress (): void {
    this.app.use(json())
  }

  private setupControllers (): void {
    const forecastController = new ForecastController()

    this.addControllers([forecastController])
  }

  public getApp (): Application {
    return this.app
  }
}
