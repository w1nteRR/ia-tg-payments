import { injectable } from 'inversify'
import { CheckPaymentDto } from '../core/repositories/dto/check-payment.dto'
import { ConfirmPaymentDto } from '../core/repositories/dto/confirm-payment.dto'

@injectable()
export class SubscribersServiceApi {
  private readonly baseUrl = process.env.SUBSCRIBERS_API_URL

  public async checkSubscriber(dto: CheckPaymentDto): Promise<boolean> {
    const response = await fetch(`${this.baseUrl}/subscriber/${dto.user_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const result = (await response.json()) as null | object

    return result !== null && Object.keys(result).length > 0
  }

  public async saveSubscriber(dto: ConfirmPaymentDto): Promise<void> {
    const { subscriber } = dto

    await fetch(`${this.baseUrl}/subscriber`, {
      method: 'POST',
      body: JSON.stringify(subscriber),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
