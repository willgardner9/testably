import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { SessionDevices } from 'App/Enums/SessionDevices'
import Conversion from 'App/Models/Conversion'

export default class SessionSeeder extends BaseSeeder {
  public async run() {
    await Conversion.createMany([
      {
        userId: '4f0ddab5-a394-4922-93d2-89fb6c069b66',
        testId: '42d49fcd-3ab1-4da9-bb8f-312c30ea6e1e',
        variationId: 'fa024753-8d63-4a59-a1c3-511cfd4f7fc5',
        device: SessionDevices.DESKTOP,
        country: 'GB',
      },
      {
        userId: '4f0ddab5-a394-4922-93d2-89fb6c069b66',
        testId: '42d49fcd-3ab1-4da9-bb8f-312c30ea6e1e',
        variationId: 'fa024753-8d63-4a59-a1c3-511cfd4f7fc5',
        device: SessionDevices.DESKTOP,
        country: 'GB',
      },
      {
        userId: '4f0ddab5-a394-4922-93d2-89fb6c069b66',
        testId: '42d49fcd-3ab1-4da9-bb8f-312c30ea6e1e',
        variationId: 'fa024753-8d63-4a59-a1c3-511cfd4f7fc5',
        device: SessionDevices.DESKTOP,
        country: 'GB',
      },
      {
        userId: '4f0ddab5-a394-4922-93d2-89fb6c069b66',
        testId: '42d49fcd-3ab1-4da9-bb8f-312c30ea6e1e',
        variationId: 'fa024753-8d63-4a59-a1c3-511cfd4f7fc5',
        device: SessionDevices.DESKTOP,
        country: 'GB',
      },
      {
        userId: '4f0ddab5-a394-4922-93d2-89fb6c069b66',
        testId: '42d49fcd-3ab1-4da9-bb8f-312c30ea6e1e',
        variationId: 'fa024753-8d63-4a59-a1c3-511cfd4f7fc5',
        device: SessionDevices.DESKTOP,
        country: 'GB',
      },
    ])
  }
}
