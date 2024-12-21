import { inject, injectable } from 'inversify'
import { CheckPaymentDto } from '../repositories/dto/check-payment.dto'
import { PaymentsRepository } from '../../infrastructure/payments.repository'

@injectable()
export class CheckPaymentUseCase {
  constructor(
    @inject(PaymentsRepository)
    private paymentsRepository: PaymentsRepository,
  ) {}

  public async execute(dto: CheckPaymentDto): Promise<boolean> {
    const { user_id } = dto
    const currentTimestamp = Math.floor(Date.now() / 1000)

    const payment = await this.paymentsRepository.findPayment({
      user_id,
    })

    if (!payment) return true

    const isActiveSubscription =
      payment.subscription_expiration_date > currentTimestamp

    return !isActiveSubscription
  }
}
